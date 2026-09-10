# wingman-landing-page-assessment
Production-style marketing landing page with lead generation, API integration, CRM simulation, and analytics tracking.


# Wingman Landing Page Assessment

This project is a responsive marketing landing page created for the Web Developer Technical Assessment.

The goal of the project is to demonstrate a basic production-style landing page including lead generation, API handling, marketing tracking, responsive design and SEO/performance considerations.

## Live Website

Netlify URL: TBD

## Technologies Used

- HTML5
- CSS
- Bootstrap 5
- JavaScript
- Netlify
- Netlify Functions
- Google Tag Manager
- Google Analytics 4
- Meta Pixel

I decided to keep the frontend simple instead of using a JavaScript framework because the project is a single marketing landing page and does not require a complex application structure.

## Project Structure

```text
/
├── index.html
├── bootstrap5.css
├── bootstrapicons.css
├── wingmancssexam.css
├── heroimage.png
├── netlify/
│   └── functions/
│       └── submit-lead.mjs
├── netlify.toml
└── README.md
```

## Landing Page

The page includes the main sections requested in the assessment:

- Hero and CTA
- Services/features
- How it works
- Benefits
- Testimonials
- Lead form
- Footer

The layout is responsive for desktop, tablet and mobile.

## Lead Form

The form collects:

- Name
- Email
- Company
- Phone
- Message

The basic flow is:

```text
User fills in form
        ↓
Frontend validation
        ↓
POST request to API
        ↓
Server validation
        ↓
CRM simulation
        ↓
Success / Error response
```

While the request is being processed, the submit button is disabled to help prevent accidental duplicate submissions.

The page also shows loading, success and error states depending on the API response.

## API

The frontend sends the form information to:

```text
POST /api/lead
```

The API is handled using a Netlify Function.

The function validates the submitted information and then simulates sending the lead to a CRM.

A real production version could connect this function to HubSpot or another CRM.

## CRM Integration

For this assessment I am simulating the CRM integration rather than using real HubSpot credentials.

In a production environment, the HubSpot access token or other API credentials would be stored as environment variables on the server and would not be included in the frontend JavaScript or GitHub repository.

If the CRM request fails, the API should return an error so the frontend can display the error state.

## Marketing Tracking

Google Tag Manager is used to manage the marketing tracking.

The main events I am tracking are:

- page_view
- cta_click
- form_started
- form_submitted
- form_submission_failure

Google Analytics 4 receives the events through GTM.

The successful form event should only happen after the API confirms that the submission was successful.

## Meta Pixel

Meta Pixel is also included for lead conversion tracking.

The important part of the implementation is that the Meta `Lead` event is not triggered just from clicking the submit button.

The expected flow is:

```text
Submit button
      ↓
API request
      ↓
Successful response
      ↓
form_submitted
      ↓
Meta Lead
```

This should help prevent failed submissions from being counted as successful conversions.

## Debugging Scenario

Reported issue:

> Marketing says we're receiving leads, but Meta is showing fewer conversions than the number of successful form submissions.

I would start by comparing the actual successful form/API submissions against the Meta Lead events.

Things I would check:

1. Browser Network tab to confirm the form request is successful.
2. Browser Console for JavaScript or tracking errors.
3. GTM Preview / Tag Assistant to check if the correct events and tags are firing.
4. GA4 DebugView to verify the form events.
5. Meta Events Manager/Test Events to check if Meta is receiving the Lead event.
6. Check if the event is firing too early or not firing after some successful requests.
7. Check for duplicate events or duplicate form submissions.
8. Check if browser/privacy/ad-blocking could affect client-side tracking.

I would also compare backend/API successful submissions with GA4 and Meta events.

After making a fix, I would submit several controlled test leads and compare:

```text
Successful API requests
vs
GA4 form_submitted
vs
Meta Lead events
```

This would help verify whether the tracking numbers are matching correctly.

## SEO

Basic SEO improvements included in the landing page:

- Page title
- Meta description
- Semantic HTML
- Heading structure
- Image alt text
- Open Graph metadata
- Mobile responsive layout

The page is also kept relatively lightweight to avoid unnecessary third-party scripts.

## Performance

The final deployed website will be tested using Chrome Lighthouse.

Current results:

| Test | Score |
|---|---:|
| Performance | TBD |
| Accessibility | TBD |
| Best Practices | TBD |
| SEO | TBD |

I will update these results after testing the final Netlify deployment.

## Creating More Campaign Pages

If Marketing needed 10 more landing pages using the same structure, I would avoid copying the complete HTML page 10 times.

I would make the common sections reusable and move campaign-specific information such as:

- Headline
- Description
- CTA
- Images
- Benefits
- Campaign ID

into a configuration or data file.

For example:

```javascript
{
    campaign: "campaign-01",
    headline: "Campaign Headline",
    description: "Campaign description",
    cta: "Get Started",
    heroImage: "/images/campaign-01.webp"
}
```

The same template could then be reused for different campaigns.

This would also keep form handling and marketing tracking consistent between campaigns.

If the number of campaigns became much larger, I would also consider using a CMS so Marketing could manage the campaign content without needing to directly edit the code.

## Accessibility

Some basic accessibility considerations included are:

- Semantic HTML
- Form labels
- Alt text
- Keyboard accessible buttons and links
- Clear success/error messages
- Responsive layout
- Readable text and contrast

## Assumptions / Limitations

- BeatForge is a fictional company used for the assessment.
- CRM submission is simulated.
- No real HubSpot credentials are included.
- Tracking is mainly implemented for demonstration/testing purposes.
- This is a small technical assessment project and not a complete production application.

## What I Would Improve With More Time

With additional time I would look at:

- Real HubSpot integration
- Better server-side duplicate lead detection
- Spam protection
- Automated testing
- More accessibility testing
- Server-side conversion tracking
- More detailed error logging
- Automated performance testing
