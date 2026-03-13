# LWC Contact Email Sender

A Salesforce Lightning Web Component (LWC) that allows users to search Contacts using a typeahead lookup, select multiple contacts using pills UI, and send emails to selected contacts using Apex.

---

## 🚀 Features

- Typeahead contact search (Name or Email)
- Debounced server calls for performance
- Live search results
- Multi-contact selection using Pills UI
- Remove selected contacts easily
- Email Subject and Message input
- Send email to selected contacts using Apex
- Toast notifications for success and error handling
- Skips contacts without email addresses

---

## 🧩 Tech Stack

- Salesforce Lightning Web Components (LWC)
- Apex
- SOQL
- Salesforce Lightning Design System (SLDS)

---

## 🏗 Project Structure

```
force-app/
 └── main/
      └── default/
           ├── lwc/
           │    └── sendContactsEmail
           │         ├── sendContactsEmail.html
           │         ├── sendContactsEmail.js
           │         ├── sendContactsEmail.js-meta.xml
           │
           └── classes/
                └── ContactLookUp.cls
```

---

## ⚙️ How It Works

1. User enters a Contact Name or Email in the search field.
2. LWC calls Apex method with debouncing.
3. Apex returns matching Contacts.
4. User selects contacts from the dropdown list.
5. Selected contacts appear as **pills**.
6. User enters **Subject** and **Message**.
7. Clicking **Send Email** calls Apex to send emails.

---

## 📸 UI Preview

- Contact lookup search
- Selected contacts displayed as pills
- Subject and Message fields
- Send Email button

---

## 🔐 Best Practices Implemented

- Debounced server requests
- SLDS styling
- Secure Apex with `with sharing`
- Avoid duplicate contact selection
- Error handling with Toast messages
- Validation for Subject and Message

---

## 📌 Apex Method Example

```apex
@AuraEnabled
public static void sendContactEmail(List<Id> conId, String conSubject, String conMessage){
    List<Contact> contacts = [
        SELECT Email
        FROM Contact
        WHERE Id IN :conId AND Email != null
    ];
}
```

---

## 💡 Learning Outcomes

This project demonstrates:

- Building custom lookup components in LWC
- Handling server communication with Apex
- Managing UI state with JavaScript
- Using SLDS for Salesforce UI consistency
- Implementing multi-select UI with pills

---

## 👩‍💻 Author

Lalitha Murthy  
Salesforce Developer

---

## ⭐ Future Improvements

- Keyboard navigation for lookup dropdown
- Email templates support
- Loading spinner
- Improved validation
