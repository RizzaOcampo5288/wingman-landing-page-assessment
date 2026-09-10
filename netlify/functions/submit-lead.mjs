[build]
  functions = "netlify/functions"

[[redirects]]
  from = "/api/lead"
  to = "/.netlify/functions/submit-lead"
  status = 200
