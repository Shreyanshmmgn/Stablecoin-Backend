{
  currency: 'USDT',
  items: [ { description: 'Pen', amount: 1 } ],
  totalAmount: 1,
  paidAmount: 0,
  expires: 1635926528465,
  created: 1635840128465,
  wallet: {
    _id: '902fba14-6e7f-4b4e-bb97-afcef2cb464a',
    address: '0x142a3fEBf223012845d9Ce44d6293dBCCcD93b51',
    key: '0xbb45828c09b4f06d061d8220ba929fdf4b4baad3f8f4f124362ae9d03186ddda',
    created: 1635840128698
  },
  state: 'pending',
  _id: 'cc6c543e-f8b8-48be-941c-ff3c5158c387',
  _rev: '1-ffca825960164fc11a7cb88977837bed'
}
curl -X POST http://localhost:8000/api/v1/invoice 
--header "Content-Type: application/json"  -d '
{"apiKey":"IG353536346StblC345","currency":"USDT","items":
[{"description":"Pencil","amount":1}]}'