import { LightningElement, track,wire } from 'lwc';
import getBikeList from '@salesforce/apex/BikeList.getBikeList'
export default class SearchBikes extends LightningElement {
    bikeName;
    @track BikeList;
    @track errors;
   
    handleChange(event){
        this.bikeName=event.target.value;
    }
    handleSearch(){
       
        getBikeList({searchKey:this.bikeName})
        
            .then(result=>{
            this.BikeList=result;
            
            })
            .catch(error=>{
                this.errors=error;
            });
            
        
    }

}
