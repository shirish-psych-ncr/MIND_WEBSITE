# Mind Grace integration readiness

This static site intentionally does not claim to provide an EHR, patient portal, payment gateway, telemedicine service, CRM, or analytics platform. Complete this checklist before adding any vendor or collecting additional clinical information.

## Required decisions

- [ ] Name the clinic data fiduciary/contact and the person responsible for privacy requests.
- [ ] Confirm the approved domain email and the routine response window.
- [ ] Confirm clinician registration details, clinic registration details, hours, fees, insurance, and teleconsultation availability.
- [ ] Define what information may be collected for appointment coordination and what must never be collected through public forms, email, or WhatsApp.

## Vendor review

- [ ] Document each vendor that receives patient or appointment data.
- [ ] Review data-processing terms, hosting locations, subprocessors, access controls, breach notification, export, deletion, and retention capabilities.
- [ ] Confirm whether parental/guardian consent is required for child-development enquiries and how it will be verified.
- [ ] Record the operational owner for account access, backups, and offboarding.

## Before launch

- [ ] Obtain clinical and legal review of privacy, consent, patient-rights, grievance, emergency, and telemedicine wording.
- [ ] Test least-privilege access, audit logs, deletion/withdrawal requests, and incident response.
- [ ] Test vendor failure and provide a safe fallback that does not ask patients to disclose emergency details.
- [ ] Add analytics only after the provider, events, consent behavior, retention, and privacy notice are approved.

## Current website boundary

The current booking experience remains an embedded third-party form for routine appointment coordination. It is gated by an explicit notice and directs emergencies to 112 or the nearest hospital emergency department. This is a website safeguard, not a substitute for a secure clinical system or legal review.
