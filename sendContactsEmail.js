import { LightningElement, track } from 'lwc';
import searchContact from '@salesforce/apex/ContactLookUp.searchContact';
import  sendContactEmail  from '@salesforce/apex/ContactLookUp.sendContactEmail';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class SendContactsEmail extends LightningElement {
    searchterm;
    isLoading = false;
    @track contacts = [];
    debounceTimer;
    @track selectedContact = [];
    selectedContactId = [];
    selectedPills = [];
    subject;
    message;

    handleChange(event){
        this.searchterm = event.target.value;
        clearTimeout(this.debounceTimer);
       this.debounceTimer = setTimeout(() => {
            this.isLoading = true;
            searchContact({ inputkey : this.searchterm })
                .then(result => {
                    this.contacts = result || [];
                })
                .catch(error => {
                    // Optionally show toast instead of console
                    console.error(error);
                })
                .finally(() => {
                    this.isLoading = false;
                });
        }, 300);
    }
    handleMail(){
        if(!this.subject || !this.message){
            this.showToast('Error', 'Subject and message must be filled for Email', 'error');
            return;
        }
        sendContactEmail({ conId: this.selectedContactId, conSubject: this.subject, conMessage: this.message })
            .then(() => {
                this.showToast('Success', 'Email sent successfully', 'success');
            })
            .catch(error => {
                const msg = (error && error.body && error.body.message) ? error.body.message : 'Unknown error';
                this.showToast('Error', msg, 'error');
            });
    }
   get hasContacts(){
       return Boolean(this.contacts && this.contacts.length) && !this.isLoading;
   }
   selectContact(event){
    console.log("Clicked");
        const id = event.currentTarget.dataset.id;
        const name = event.currentTarget.dataset.name;
        console.log(id,name);
        if (!this.selectedContactId.includes(id)) {
            this.selectedContactId = [...this.selectedContactId, id];
            this.selectedPills = [...this.selectedPills, { label: name, name: id }];
        }
    }
    handleItemRemove(event){
        const id = event.detail.item.name;
        this.selectedPills = this.selectedPills.filter(p => p.name !== id);
        this.selectedContactId = this.selectedContactId.filter(cId => cId !== id);
    }
    handleSubject(event){
        this.subject = event.target && event.target.value;
    }
    handleMessage(event){
        this.message = event.target && event.target.value;
    }
   showToast(title, message, variant){
        this.dispatchEvent(
            new ShowToastEvent({
                title,
                message,
                variant
            })
        );
   }
}
   

