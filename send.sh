curl --request POST \
  --url https://api.brevo.com/v3/smtp/email \
  --header 'accept: application/json' \
  --header 'api-key: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' \
  --header 'content-type: application/json' \
  --data '{  
   "sender":{  
      "name":"Sender Alex",
      "email":"senderalex@example.com"
   },
   "to":[  
      {  
         "email":"baphonreaz@gmail.com",
         "name":"John Doe"
      }
   ],
   "subject":"Hello world",
   "htmlContent":"<html><head></head><body><p>Hello,</p>This is my first transactional email sent from Brevo.</p></body></html>"
}'