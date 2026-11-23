import {useState,useEffect} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import {useT} from './i18n.js'
import {useStore,join,cancel,waitingList,waitMins,price,position,estWait,tokenOf,working,barberTicket} from './store.js'
import {Card,Btn,Ghost,svcName,bName} from './ui.jsx'
export const useTick=()=>{const [,n]=useState(0);useEffect(()=>{const i=setInterval(()=>n(x=>x+1),3000);return()=>clearInterval(i)},[])}
export const Home=()=>{const {t,lang}=useT();const s=useStore();const w=waitingList(s)
 return <div className="p-4 max-w-md mx-auto space-y-4">
  <Card><div className={s.open?'text-green-400':'text-red-400'}>● {s.open?t('open'):t('closed')}</div>
   <div className="text-2xl mt-2">{w.length} {t('people')} {t('waiting')} · {t('about')} {waitMins(s,w)} {t('min')}</div></Card>
  <div className="flex flex-wrap gap-2">{s.barbers.map(b=><span key={b.id} className="px-3 py-2 rounded-full bg-white/10 text-sm">{lang==='gu'?b.gu:b.name} · {!b.onDuty?'—':b.onBreak?t('brk'):barberTicket(s,b)?t('busy'):t('free')}</span>)}</div>
  <Link to="/join" className="block text-center text-xl font-bold bg-gold text-black rounded-2xl py-5">{t('join')}</Link>
  <div className="text-xs text-white/40 flex gap-3 flex-wrap pt-6"><Link to="/reception">Reception</Link><Link to="/barber/ravi">Barber</Link><Link to="/display">TV</Link><Link to="/admin">Owner</Link></div></div>}
export const Join=()=>{const {t,lang}=useT();const s=useStore();const nav=useNavigate()
 const [name,setName]=useState(''),[phone,setPhone]=useState(''),[sel,setSel]=useState([]),[bar,setBar]=useState('any'),[msg,setMsg]=useState('')
 const svcs=s.services.filter(x=>x.on),tot=sel.reduce((a,id)=>a+(s.services.find(x=>x.id===id)?.min||0),0)
 const toggle=id=>setSel(p=>p.includes(id)?p.filter(x=>x!==id):p.length<3?[...p,id]:p)
 const ok=name.trim()&&/^\d{10}$/.test(phone)&&sel.length
 const wait=waitMins(s,waitingList(s))+Math.ceil(tot/working(s))
 const go=()=>{if(!ok)return setMsg(t('invalid'));const r=join(name.trim(),phone,sel,bar);if(r.existing){setMsg(t('existing'));return setTimeout(()=>nav('/status/'+r.existing.id),1200)}if(r.ticket)nav('/status/'+r.ticket.id)}
 return <div className="p-4 max-w-md mx-auto space-y-4">
  <input value={name} onChange={e=>setName(e.target.value)} placeholder={t('name')} className="w-full min-h-11 rounded-xl bg-white/10 px-4"/>
  <input value={phone} inputMode="numeric" maxLength={10} onChange={e=>setPhone(e.target.value.replace(/\D/g,''))} placeholder={t('phone')} className="w-full min-h-11 rounded-xl bg-white/10 px-4"/>
  <div className="text-white/60">{t('services')}</div>
  <div className="grid grid-cols-2 gap-2">{svcs.map(x=><button key={x.id} onClick={()=>toggle(x.id)} className={`rounded-2xl p-3 text-left min-h-11 border ${sel.includes(x.id)?'border-gold bg-gold/20':'border-white/10 bg-white/5'}`}><div className="font-semibold">{lang==='gu'?x.gu:x.en}</div><div className="text-sm text-white/60">{x.min} {t('min')} · ₹{x.price}</div></button>)}</div>
  <div className="text-white/60">{t('barber')}</div>
  <div className="flex flex-wrap gap-2">{['any',...s.barbers.filter(b=>b.onDuty).map(b=>b.id)].map(id=><button key={id} onClick={()=>setBar(id)} className={`min-h-11 px-4 rounded-xl border ${bar===id?'border-gold bg-gold/20':'border-white/20'}`}>{bName(s,id,lang,t)}</button>)}</div>
  <Card>{t('total')} {tot} {t('min')} · ₹{price(s,sel)} · {t('expected')} ~{wait} {t('min')}</Card>
  {msg&&<div className="text-amber-400">{msg}</div>}
  {!s.open&&<div className="text-red-400">{t('closed')}</div>}
  <Btn disabled={!s.open} onClick={go} className="w-full">{t('confirm')}</Btn></div>}
export const Status=()=>{const {id}=useParams();const {t,lang}=useT();const s=useStore();useTick();const tk=s.tickets.find(x=>x.id===id)
 const called=tk?.status==='called'
 useEffect(()=>{if(called&&navigator.vibrate)navigator.vibrate([300,150,300])},[called])
 if(!tk)return <div className="p-6">Not found. <Link className="text-gold" to="/join">{t('join')}</Link></div>
 const p=position(s,tk),w=estWait(s,tk),b=tk.barber!=='any'&&s.barbers.find(x=>x.id===tk.barber)
 if(called)return <div className="fixed inset-0 bg-gold text-black grid place-items-center text-center p-6 animate-pulse z-10"><div><div className="text-7xl font-black">{tokenOf(tk)}</div><div className="text-4xl font-bold mt-4">{t('turn')} {bName(s,tk.calledBarber,lang,t)}</div></div></div>
 const R=60,C=2*Math.PI*R,frac=tk.status==='waiting'?Math.min(1,w/Math.max(w,60)):0
 return <div className="p-4 max-w-md mx-auto space-y-4 text-center">
  <div className="text-6xl font-black text-gold">{tokenOf(tk)}</div><div>{tk.name} · {tk.services.map(x=>svcName(s,x,lang)).join(', ')}</div>
  {tk.status==='waiting'&&<>
   <div className="text-2xl">{p}{['th','st','nd','rd'][p%10>3||Math.floor(p/10)===1?0:p%10]} {t('pos')}</div>
   <svg viewBox="0 0 140 140" className="w-44 mx-auto"><circle cx="70" cy="70" r={R} stroke="#ffffff22" strokeWidth="10" fill="none"/><circle cx="70" cy="70" r={R} stroke="#D4A017" strokeWidth="10" fill="none" strokeDasharray={C} strokeDashoffset={C*(1-frac)} transform="rotate(-90 70 70)" strokeLinecap="round"/><text x="70" y="68" textAnchor="middle" fill="#fff" fontSize="26" fontWeight="700">{w}</text><text x="70" y="90" textAnchor="middle" fill="#aaa" fontSize="12">{t('about')} {t('min')}</text></svg>
   {p<=2&&<div className="rounded-xl bg-gold text-black p-3 font-bold">{t('comesoon')}</div>}
   {b?.onBreak&&<div className="text-amber-400">{b.name} {t('onbreak')}</div>}
   <Ghost onClick={()=>confirm(t('sure'))&&cancel(tk.id)}>{t('cancel')}</Ghost></>}
  {tk.status==='inchair'&&<div className="text-2xl text-green-400">{t('inchair')}</div>}
  {tk.status==='done'&&<div className="text-2xl text-green-400">{t('done_t')}</div>}
  {['cancelled','noshow'].includes(tk.status)&&<><div className="text-amber-400">{t('gone')}</div><Link to="/join" className="inline-block bg-gold text-black rounded-xl px-5 py-3 font-bold">{t('join')}</Link></>}</div>}
