export const Validation=(input)=>{
    const smallLeterCheck=new RegExp("^[a-z]+$");
    const doubleAt=new RegExp("^[^@]*@?[^@]*$");
    const name=input.split("@")[0];
    
    if(!smallLeterCheck.test(name)){
        return "Please Check UPI id"
    }if(!doubleAt.test(input)){
        return "Please Check UPI id"
    }
    else{
        return ""
    }
}