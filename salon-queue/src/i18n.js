import {useSyncExternalStore} from 'react'
const T={
salon:['Gold Cut Salon','ગોલ્ડ કટ સલૂન'],open:['Open · Closes 9 PM','ખુલ્લું · રાત્રે 9 વાગ્યે બંધ'],closed:['Queue closed for online joining','ઓનલાઇન જોડાવાનું બંધ છે'],
waiting:['waiting','રાહ જોઈ રહ્યા છે'],people:['people','લોકો'],about:['about','લગભગ'],min:['min','મિનિટ'],
join:['Join Queue','કતારમાં જોડાઓ'],name:['Your name','તમારું નામ'],phone:['Phone (10 digits)','ફોન (10 અંક)'],services:['Services (max 3)','સેવાઓ (વધુમાં વધુ 3)'],
barber:['Barber','બાર્બર'],any:['Any barber (fastest)','કોઈપણ બાર્બર (ઝડપી)'],total:['Total','કુલ'],expected:['Expected wait','અંદાજિત રાહ'],confirm:['Confirm','પુષ્ટિ કરો'],
free:['free','ફ્રી'],busy:['busy','વ્યસ્ત'],brk:['on break','બ્રેક પર'],onbreak:['is on break','બ્રેક પર છે'],
pos:['in line','લાઇનમાં'],comesoon:['Start coming to the salon','સલૂન તરફ આવવાનું શરૂ કરો'],turn:["It's your turn! Go to",'તમારો વારો! જાઓ'],
cancel:['Cancel my spot','મારી જગ્યા રદ કરો'],sure:['Cancel your spot?','જગ્યા રદ કરવી છે?'],existing:['You already have an active spot','તમારી પાસે પહેલેથી જગ્યા છે'],
invalid:['Enter a name and a valid 10-digit phone','નામ અને 10 અંકનો ફોન દાખલ કરો'],lang:['ગુજરાતી','English'],
call:['Call next','આગળ બોલાવો'],noshow:['No-show','ગેરહાજર'],walkin:['+ Add walk-in','+ વોક-ઇન ઉમેરો'],empty:['No one waiting — walk right in!','કોઈ રાહ જોતું નથી — સીધા આવો!'],
start:['Start','શરૂ'],done:['Done','પૂર્ણ'],next:['Next for you','તમારા માટે આગળ'],avail:['Available','ઉપલબ્ધ'],now:['Now','હાલ'],up:['Up next','આગળ'],
pin:['Enter PIN','પિન દાખલ કરો'],served:['Served','સેવા આપી'],avgw:['Avg wait','સરેરાશ રાહ'],noshows:['No-shows','ગેરહાજર'],
open_s:['Open','ખુલ્લું'],close_s:['Closed','બંધ'],duty:['On duty','ડ્યુટી પર'],done_t:['All done — thank you!','પૂર્ણ — આભાર!'],
gone:['This spot was cancelled or marked no-show. Join again to get a new token.','આ જગ્યા રદ થઈ. નવો ટોકન લેવા ફરી જોડાઓ.'],inchair:['You are in the chair','તમે ખુરશીમાં છો'],
cur:['Current customer','હાલના ગ્રાહક'],none:['—','—'],
}
let lang=localStorage.getItem('lang')||'en',subs=new Set()
export const setLang=l=>{lang=l;localStorage.setItem('lang',l);subs.forEach(f=>f())}
export const useT=()=>{useSyncExternalStore(f=>(subs.add(f),()=>subs.delete(f)),()=>lang);return {lang,t:k=>(T[k]||[k,k])[lang==='gu'?1:0]}}
