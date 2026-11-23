// ALL queue rules live here (see docs/03-flows-rules.md)
import {useSyncExternalStore} from 'react'
const K='salon-queue-v1',L=new Set()
const seed=()=>({open:true,seq:1,
 services:[{id:'hc',en:'Haircut',gu:'હેરકટ',min:30,price:150,on:true},{id:'bt',en:'Beard trim',gu:'દાઢી ટ્રીમ',min:15,price:80,on:true},{id:'hs',en:'Hair spa',gu:'હેર સ્પા',min:45,price:400,on:true},{id:'fc',en:'Facial',gu:'ફેશિયલ',min:30,price:300,on:true}],
 barbers:[['ravi','Ravi','રવિ'],['amit','Amit','અમિત'],['imran','Imran','ઇમરાન']].map(([id,name,gu])=>({id,name,gu,onDuty:true,onBreak:false})),
 tickets:[]})
let raw=null,cache=null
const read=()=>{const r=localStorage.getItem(K);if(r!==raw||!cache){raw=r;cache=r?JSON.parse(r):seed()}return cache}
const emit=()=>L.forEach(f=>f())
window.addEventListener('storage',e=>{if(e.key===K)emit()})
setInterval(emit,5000)
const sub=f=>(L.add(f),()=>L.delete(f))
export const useStore=()=>useSyncExternalStore(sub,read)
export const getState=read
const mutate=fn=>{const s=structuredClone(read());const r=fn(s);raw=JSON.stringify(s);localStorage.setItem(K,raw);cache=s;emit();return r}
export const reset=()=>{localStorage.removeItem(K);raw=null;cache=null;emit()}

export const isActive=t=>['waiting','called','inchair'].includes(t.status)
export const dur=(s,t)=>t.services.reduce((a,id)=>a+(s.services.find(x=>x.id===id)?.min||0),0)
export const price=(s,ids)=>ids.reduce((a,id)=>a+(s.services.find(x=>x.id===id)?.price||0),0)
export const working=s=>Math.max(1,s.barbers.filter(b=>b.onDuty&&!b.onBreak).length)
export const waitingList=s=>s.tickets.filter(t=>t.status==='waiting').sort((a,b)=>a.joinedAt-b.joinedAt)
export const waitMins=(s,ahead)=>Math.ceil(ahead.reduce((a,t)=>a+dur(s,t),0)/working(s))
export const position=(s,t)=>waitingList(s).findIndex(x=>x.id===t.id)+1
export const estWait=(s,t)=>waitMins(s,waitingList(s).filter(x=>x.joinedAt<t.joinedAt))
export const tokenOf=t=>'S-'+t.n
export const barberTicket=(s,b)=>s.tickets.find(t=>t.calledBarber===b.id&&(t.status==='called'||t.status==='inchair'))
export const eligible=(s,b)=>waitingList(s).find(t=>t.barber==='any'||t.barber===b.id)
export const activeByPhone=(s,p)=>s.tickets.find(t=>t.phone===p&&isActive(t))

export const join=(name,phone,services,barber,walkin=false)=>mutate(s=>{
 const ex=activeByPhone(s,phone);if(ex)return{existing:ex}
 if(!s.open&&!walkin)return{err:'closed'}
 const n=s.seq++;const t={id:'t'+Date.now()+n,n,name,phone,services,barber,status:'waiting',joinedAt:Date.now(),walkin}
 s.tickets.push(t);return{ticket:t}})
export const callNext=bid=>mutate(s=>{const b=s.barbers.find(x=>x.id===bid)
 if(!b||!b.onDuty||b.onBreak||barberTicket(s,b))return
 const t=eligible(s,b);if(!t)return
 t.status='called';t.calledBarber=bid;t.calledAt=Date.now()})
const set=(id,from,to,extra={})=>mutate(s=>{const t=s.tickets.find(x=>x.id===id);if(t&&from.includes(t.status)){t.status=to;Object.assign(t,extra)}})
export const startCut=id=>set(id,['called'],'inchair',{startedAt:Date.now()})
export const finish=id=>set(id,['inchair'],'done',{doneAt:Date.now()})
export const noShow=id=>set(id,['called'],'noshow')
export const cancel=id=>set(id,['waiting'],'cancelled')
export const patch=fn=>mutate(fn)
export const demo=()=>{['Kunal','Meera','Dev','Sneha','Rahul','Isha','Jay','Nisha'].forEach((nm,i)=>{
 const r=join(nm,'90000000'+(10+i),i%3===0?['hc','bt']:['hc'],i%4===1?'ravi':'any',i%2===0)
 if(r.ticket)mutate(s=>{s.tickets.find(t=>t.id===r.ticket.id).joinedAt=Date.now()-(8-i)*9*60000})})}
