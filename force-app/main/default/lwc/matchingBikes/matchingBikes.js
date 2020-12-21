import { api, LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getBikeList from '@salesforce/apex/BikeList.getBikeList';
import { MessageContext,publish} from 'lightning/messageService';
import SAMPLEMESSAGE from "@salesforce/messageChannel/SampleMessageChannel__c";


export default class MatchingBikes extends LightningElement {
    @api
    bikerecords;
    @wire(MessageContext)
     messageContext;
     bikeName;
     BikeList;

     //goes here indira
     @track isModalOpen = false;
    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false        
        this.isModalOpen = false;
    }

    //here it goes indira
    handleClick(event) {
        event.preventDefault();                
        const message = {
            recordId: event.target.dataset.value,
            
        };
        publish(this.messageContext, SAMPLEMESSAGE, message);
    }
    connectedCallback(){
        getBikeList({searchKey:this.bikeName})
            .then(result =>{
                this.bikeList = result;
            })
            .catch(error=>{
                this.bikeList = error;
            });
    }

    onSubmitHandler(event) {
        event.preventDefault();
        // Get data from submitted form
        const fields = event.detail.fields;   
        this.template
            .querySelector('lightning-record-edit-form').submit(fields);
        console.log('Congrats! your ride is booked!');
        const evt = new ShowToastEvent({
            title: 'Booking Successful',
            message: 'Congrats! your ride has been booked',
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
        this.closeModal();
    } 
}