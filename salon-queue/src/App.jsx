import {useState} from 'react'
import {Routes,Route,Link} from 'react-router-dom'
import {useT,setLang} from './i18n.js'
import {Home,Join,Status} from './customer.jsx'
import {Reception,BarberView,Display,Admin} from './staff.jsx'
const Gate=({children})=>{const {t}=useT();const [ok,setOk]=useState(sessionStorage.pin==='1234');const [v,setV]=useState('')
 if(ok)return children
 return <div className="p-6 max-w-xs mx-auto mt-24 space-y-3"><input type="password" inputMode="numeric" placeholder={t('pin')} value={v} onChange={e=>{setV(e.target.value);if(e.target.value==='1234'){sessionStorage.pin='1234';setOk(true)}}} className="w-full min-h-11 rounded-xl bg-white/10 px-4 text-center text-xl"/></div>}
export default function App(){const {lang,t}=useT()
 return <div className="min-h-screen">
  <header className="flex justify-between items-center px-4 py-3 bg-char border-b border-gold/30"><Link to="/" className="text-gold font-bold text-lg">✂ {t('salon')}</Link>
   <button onClick={()=>setLang(lang==='en'?'gu':'en')} className="min-h-11 px-4 rounded-xl border border-gold text-gold">{t('lang')}</button></header>
  <Routes><Route path="/" element={<Home/>}/><Route path="/join" element={<Join/>}/><Route path="/status/:id" element={<Status/>}/>
   <Route path="/reception" element={<Gate><Reception/></Gate>}/><Route path="/barber/:id" element={<Gate><BarberView/></Gate>}/>
   <Route path="/display" element={<Display/>}/><Route path="/admin" element={<Gate><Admin/></Gate>}/></Routes></div>}
