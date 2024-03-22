import { headers } from "@/next.config";
import  axios  from "axios";
import { useState } from "react";

export default async function saveExpense(amount, category, description, currencySymbol) {
    let resp = {};
  

    // Post
        await axios.post("https://api.airtable.com/v0/appAiKFCZoMyS4jBV/table1",{
                    "fields": {
                    "id":  Math.floor(Math.random() * 100),
                    "amount": amount,
                    "category": category,
                    "description": description,
                    "currencySymbol": currencySymbol
                    }
                },
                {
                    headers: {
                        "Authorization": "Bearer patVSPOYRSbMLU0lS.aa9c2f5b93d82d6cdaea663ad7206a9b68a194c6018164633d6f74f92b4ff48e",
                        "Content-Type": "application/json"
                }
            }).then((response) => {
                if(response.status === 200){
                    resp.data = response.data;
                }
            })
            .catch((error) => {
                console.log("not able to save expense");
                resp.error = error.data;
            }
            )

            return resp;
};



// Get api
export async function addFromApi() {
    let resp = {};
   await axios.get("https://api.airtable.com/v0/appAiKFCZoMyS4jBV/table1",
   {
    headers: {
        "Authorization": "Bearer patVSPOYRSbMLU0lS.aa9c2f5b93d82d6cdaea663ad7206a9b68a194c6018164633d6f74f92b4ff48e",
        "Content-Type": "application/json"
}
   }
   ).then(response => {
    console.log(response.data);
    resp.data = response.data
    console.log("data",response.data);
}).catch (error => {
    console.log(error.data)
    resp.error = error.data;
    console.log("data", error.data);
})
return resp;
}



// // Delete Api
export async function delteFromApi(recordId) {
    try {
        const response = await axios.delete(
            `https://api.airtable.com/v0/appAiKFCZoMyS4jBV/table1/${recordId}`,{
                "fields": {
                "id":  Math.floor(Math.random() * 100),
                "amount": amount,
                "category": category,
                "description": description,
                "currencySymbol": currencySymbol
                }
            },
            {
                headers: {
                    "Authorization": "Bearer patVSPOYRSbMLU0lS.aa9c2f5b93d82d6cdaea663ad7206a9b68a194c6018164633d6f74f92b4ff48e",
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response.data);
        return { data: response.data };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}

// Update the content
export async function updateRecord(recordId) {
    try {
        const response = await axios.patch(
            `https://api.airtable.com/v0/appAiKFCZoMyS4jBV/table1${recordId}`,
            {
                headers: {
                    "Authorization": "Bearer patVSPOYRSbMLU0lS.aa9c2f5b93d82d6cdaea663ad7206a9b68a194c6018164633d6f74f92b4ff48e",
                    "Content-Type": "application/json"
                }
            }
        );
        console.log(response.data);
        return { data: response.data };
    } catch (error) {
        console.error(error);
        return { error: error.message };
    }
}