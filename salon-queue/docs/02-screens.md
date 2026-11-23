# Screens
## Screen 1: Home (/)
Salon name, 'Open · Closes 9 PM' badge; live card '6 people waiting · about 50 min'; barber chips with status (busy/free/on break); big gold [Join Queue].
## Screen 2: Join Queue (/join)
Name, Phone (10 digits validated); service cards multi-select max 3; barber picker ('Any barber' or a barber); live summary 'Total 45 min · ₹230 · Expected wait ~35 min'; [Confirm] -> My Status. If queue closed: button disabled with message.
## Screen 3: My Status (/status/:id)
Token 'S-14' large, position '4th in line'; circular countdown that updates by itself; at 2nd in line banner 'Start coming to the salon'; when called full-screen gold 'It's your turn! Go to Ravi' (pulse + vibration); [Cancel my spot] with confirmation; 'Ravi is on break' notice.
## Screen 4: Reception (/reception) — tablet, PIN 1234
Left: barber cards (current customer, time, [Call next]); right: waiting list (token, name, services, preferred barber, waiting time, [Cancel]); called customers have [No-show]; top [+ Add walk-in]; waiting > 60 min amber.
## Screen 5: Barber View (/barber/:id) — phone, PIN 1234
Current customer, timer; big [Start] -> [Done]; 'Next for you'; On break / Available toggle.
## Screen 6: TV (/display)
Row per barber 'Now: S-12'; 'Up next' 5 tokens with est. times; newly-called token flashes gold + chime.
## Screen 7: Owner (/admin) — PIN 1234
Services (EN/GU, minutes, price, on/off); barbers on duty; Open/Closed switch; today's stats: served, avg wait, no-shows. Demo-data and reset buttons.
