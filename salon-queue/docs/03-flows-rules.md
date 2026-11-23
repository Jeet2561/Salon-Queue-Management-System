# Flows & Rules
## Flow: remote customer
Home -> Join -> services + 'Any barber' -> token S-14 -> My Status -> at 2nd 'Start coming' -> receptionist Call next -> 'It's your turn!' + TV flash -> barber Start, Done -> leaves queue.
## Flow: walk-in
Reception + Add walk-in -> name, phone, services -> joins same queue at the end.
## Rules
- Statuses: Waiting -> Called -> In chair -> Done. Never backwards. Waiting -> Cancelled. Called -> No-show.
- First come, first served.
- Call next for barber X picks the earliest customer who chose X or 'Any'.
- A customer who chose Ravi is never given to another barber.
- A barber has one customer at a time.
- Waiting time ≈ total minutes of services ahead ÷ barbers working.
- One active spot per phone number.
- Called but absent: receptionist marks No-show; if they return they are added again at the END with a new token.
- Online joining closes when owner switches Closed (walk-ins still allowed).
- Barber on break -> customers who chose them see 'Ravi is on break'.
## Test checklist
[ ] Join with 2 services -> correct total time and price
[ ] Same phone twice -> existing spot shown, no duplicate
[ ] Call next for Amit skips a customer who chose Ravi
[ ] Call next -> customer's phone shows 'It's your turn' within 5 s
[ ] Start/Done on Barber View updates Reception and TV
[ ] No-show then re-add -> end of queue, new token
[ ] Close online queue -> Join disabled with message
[ ] Language toggle switches all labels to Gujarati
[ ] Waiting time goes down as customers finish
[ ] Phone, tablet and TV windows stay in sync
