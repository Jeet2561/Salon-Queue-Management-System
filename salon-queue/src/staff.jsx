import {useState,useEffect,useRef} from 'react'
import {useParams} from 'react-router-dom'
import {useT} from './i18n.js'
import {useStore,join,callNext,startCut,finish,noShow,cancel,patch,reset,demo,waitingList,waitMins,tokenOf,barberTicket,eligible,dur,price} from './store.js'
import {Card,Btn,Ghost,svcName,bName,mins} from './ui.jsx'
import {useTick} from './customer.jsx'
export const Reception=()=>{const {t,lang}=useT();const s=useStore();useTick();const [show,setShow]=useState(false)
 const [f,setF]=useState({name:'',phone:'',sv:['hc']});const wl=waitingList(s)
 const add=()=>{if(!f.name||!/^\d{10}$/.test(f.phone)||!f.sv.length)return alert(t('invalid'));join(f.name,f.phone,f.sv,'any',true);setShow(false);setF({name:'',phone:'',sv:['hc']})}
 return <div className="p-4 space-y-4">
  <Btn onClick={()=>setShow(!show)}>{t('walkin')}</Btn>
  {show&&<Card className="space-y-2 max-w-md"><input placeholder={t('name')} value={f.name} onChange={e=>setF({...f,name:e.target.value})} className="w-full min-h-11 rounded-xl bg-white/10 px-4"/><input placeholder={t('phone')} value={f.phone} maxLength={10} onChange={e=>setF({...f,phone:e.target.value.replace(/\D/g,'')})} className="w-full min-h-11 rounded-xl bg-white/10 px-4"/>
   <div className="flex flex-wrap gap-2">{s.services.filter(x=>x.on).map(x=><button key={x.id} onClick={()=>setF({...f,sv:f.sv.includes(x.id)?f.sv.filter(v=>v!==x.id):f.sv.length<3?[...f.sv,x.id]:f.sv})} className={`min-h-11 px-3 rounded-xl border ${f.sv.includes(x.id)?'border-gold bg-gold/20':'border-white/20'}`}>{lang==='gu'?x.gu:x.en}</button>)}</div><Btn onClick={add}>{t('confirm')}</Btn></Card>}
  <div className="grid md:grid-cols-3 gap-3">{s.barbers.map(b=>{const c=barberTicket(s,b),can=b.onDuty&&!b.onBreak&&!c&&eligible(s,b)
   return <Card key={b.id}><div className="font-bold text-gold text-lg">{lang==='gu'?b.gu:b.name} {b.onBreak&&`· ${t('brk')}`}</div>
    {c?<div className="my-2"><div className="text-2xl">{tokenOf(c)} {c.name}</div><div className="text-white/60 text-sm">{c.status==='called'?'Called':'In chair'} · {mins(c.calledAt)} {t('min')}</div>{c.status==='called'&&<Ghost onClick={()=>noShow(c.id)} className="mt-2">{t('noshow')}</Ghost>}</div>:<div className="my-2 text-white/40">{t('none')}</div>}
    <Btn disabled={!can} onClick={()=>callNext(b.id)}>{t('call')}</Btn></Card>})}</div>
  <Card><div className="space-y-2">{wl.length===0&&<div className="text-white/60">{t('empty')}</div>}
   {wl.map(x=>{const w=mins(x.joinedAt);return <div key={x.id} className={`flex flex-wrap items-center gap-3 rounded-xl p-3 ${w>60?'bg-amber-500/20':'bg-white/5'}`}><b className="text-gold w-12">{tokenOf(x)}</b><span className="flex-1 min-w-32">{x.name}<br/><small className="text-white/60">{x.services.map(v=>svcName(s,v,lang)).join(', ')} → {bName(s,x.barber,lang,t)}</small></span><span>{w} {t('min')}</span><Ghost onClick={()=>cancel(x.id)}>✕</Ghost></div>})}</div></Card></div>}
export const BarberView=()=>{const {id}=useParams();const {t,lang}=useT();const s=useStore();useTick();const b=s.barbers.find(x=>x.id===id)
 if(!b)return <div className="p-6">Unknown barber</div>
 const c=barberTicket(s,b),n=eligible(s,b)
 return <div className="p-4 max-w-md mx-auto space-y-4"><div className="flex gap-2 flex-wrap">{s.barbers.map(x=><a key={x.id} href={'/barber/'+x.id} className={`px-3 py-2 rounded-full ${x.id===id?'bg-gold text-black':'bg-white/10'}`}>{x.name}</a>)}</div>
  <Card><div className="text-white/60">{t('cur')}</div>{c?<><div className="text-3xl font-bold">{tokenOf(c)} {c.name}</div><div>{c.services.map(v=>svcName(s,v,lang)).join(', ')}</div><div className="text-gold text-xl">{c.status==='inchair'?mins(c.startedAt)+' '+t('min'):'Called'}</div></>:<div className="text-2xl">{t('none')}</div>}</Card>
  <div className="grid grid-cols-2 gap-3"><Btn disabled={c?.status!=='called'} onClick={()=>startCut(c.id)} className="py-6 text-xl">{t('start')}</Btn><Btn disabled={c?.status!=='inchair'} onClick={()=>finish(c.id)} className="py-6 text-xl">{t('done')}</Btn></div>
  <Card>{t('next')}: {n?`${tokenOf(n)} ${n.name} (${n.services.map(v=>svcName(s,v,lang)).join(', ')})`:t('none')}</Card>
  <Ghost className="w-full" onClick={()=>patch(st=>{const x=st.barbers.find(v=>v.id===id);x.onBreak=!x.onBreak})}>{b.onBreak?t('avail'):t('brk')}</Ghost></div>}
export const Display=()=>{const {t,lang}=useT();const s=useStore();useTick();const [flash,setFlash]=useState(null);const prev=useRef(new Set())
 const calledNow=s.tickets.filter(x=>x.status==='called')
 useEffect(()=>{const cur=new Set(calledNow.map(x=>x.id));const nw=calledNow.find(x=>!prev.current.has(x.id));prev.current=cur
  if(nw){setFlash(nw.id);try{const a=new (window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator();o.connect(a.destination);o.frequency.value=880;o.start();o.stop(a.currentTime+.4)}catch{}setTimeout(()=>setFlash(null),5000)}})
 const wl=waitingList(s).slice(0,5)
 return <div className="p-8 space-y-8"><div className="grid md:grid-cols-3 gap-6">{s.barbers.map(b=>{const c=barberTicket(s,b);return <div key={b.id} className={`rounded-3xl p-8 text-center ${c&&c.id===flash?'bg-gold text-black animate-pulse':'bg-char'}`}><div className="text-4xl font-bold">{lang==='gu'?b.gu:b.name}</div><div className="text-6xl font-black mt-4">{!b.onDuty?'—':b.onBreak?t('brk'):c?tokenOf(c):t('free')}</div><div className="text-lg opacity-60 mt-2">{t('now')}</div></div>})}</div>
  <div><div className="text-3xl text-gold mb-4">{t('up')}</div><div className="space-y-3">{wl.length===0&&<div className="text-3xl text-white/50">{t('empty')}</div>}{wl.map((x,i)=><div key={x.id} className="flex justify-between text-4xl bg-white/5 rounded-2xl p-5"><b>{tokenOf(x)}</b><span>{x.name}</span><span className="text-gold">~{waitMins(s,waitingList(s).slice(0,i))} {t('min')}</span></div>)}</div></div></div>}
export const Admin=()=>{const {t,lang}=useT();const s=useStore()
 const done=s.tickets.filter(x=>x.status==='done').length,ns=s.tickets.filter(x=>x.status==='noshow').length,cw=s.tickets.filter(x=>x.calledAt)
 const avg=cw.length?Math.round(cw.reduce((a,x)=>a+(x.calledAt-x.joinedAt),0)/cw.length/60000):0
 return <div className="p-4 max-w-2xl mx-auto space-y-4">
  <div className="grid grid-cols-3 gap-3 text-center">{[[t('served'),done],[t('avgw'),avg+' '+t('min')],[t('noshows'),ns]].map(([a,b])=><Card key={a}><div className="text-3xl text-gold font-bold">{b}</div><div className="text-sm text-white/60">{a}</div></Card>)}</div>
  <Btn onClick={()=>patch(x=>{x.open=!x.open})}>{s.open?t('open_s'):t('close_s')} ⇄</Btn>
  <Card className="space-y-2">{s.services.map(x=><div key={x.id} className="flex items-center gap-2 flex-wrap"><span className="flex-1 min-w-28">{x.en} / {x.gu}</span>
   <input type="number" value={x.min} onChange={e=>patch(st=>{st.services.find(v=>v.id===x.id).min=+e.target.value||1})} className="w-16 min-h-11 rounded-lg bg-white/10 px-2"/>
   <input type="number" value={x.price} onChange={e=>patch(st=>{st.services.find(v=>v.id===x.id).price=+e.target.value||0})} className="w-20 min-h-11 rounded-lg bg-white/10 px-2"/>
   <Ghost onClick={()=>patch(st=>{const v=st.services.find(q=>q.id===x.id);v.on=!v.on})}>{x.on?'ON':'OFF'}</Ghost></div>)}</Card>
  <Card className="flex gap-2 flex-wrap">{s.barbers.map(b=><Ghost key={b.id} onClick={()=>patch(st=>{const v=st.barbers.find(q=>q.id===b.id);v.onDuty=!v.onDuty})} className={b.onDuty?'border-gold text-gold':''}>{b.name} · {t('duty')}: {b.onDuty?'✓':'✗'}</Ghost>)}</Card>
  <div className="flex gap-2"><Ghost onClick={demo}>Load demo data</Ghost><Ghost onClick={()=>confirm('Reset all?')&&reset()}>Reset</Ghost></div></div>}
