export const Card=({children,className=''})=><div className={`rounded-2xl bg-white/5 border border-white/10 p-4 ${className}`}>{children}</div>
export const Btn=({children,className='',...p})=><button {...p} className={`min-h-11 px-5 rounded-xl font-semibold bg-gold text-black disabled:opacity-40 active:scale-95 ${className}`}>{children}</button>
export const Ghost=({children,className='',...p})=><button {...p} className={`min-h-11 px-4 rounded-xl border border-white/30 disabled:opacity-40 ${className}`}>{children}</button>
export const svcName=(s,id,lang)=>{const x=s.services.find(v=>v.id===id);return x?(lang==='gu'?x.gu:x.en):id}
export const bName=(s,id,lang,t)=>id==='any'?t('any'):(b=>lang==='gu'?b.gu:b.name)(s.barbers.find(x=>x.id===id)||{})
export const mins=ts=>Math.floor((Date.now()-ts)/60000)
