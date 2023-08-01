let Utils = {}

Utils.blockBeginSpace = (tgt)=> {
    let str = tgt.value;
    str = str ? str.trimStart() : '';
    tgt.value = str;
    return tgt.value;
}

Utils.validateForm = (arr)=> {
    let flag = true;
    for(const i of arr.address)
    {
        if(i.length===0)
        {
            flag = false;
            break;
        }
    }
    if(flag)
    {
        arr.name = Utils.removeExtraSpace(arr.name);
        if(arr.name.length===0
        || arr.dob.length===0
        || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{1,3})+$/g.test(arr.email)
        || arr.phone.length<8
        || arr.pw1.length<10 
        || !/^(?=.{10,})(?=.*[A-Z])(?=.*[~!@#$%^&*_+=<>]).*$/g.test(arr.pw1)
        || arr.pw2.length<10
        || arr.pw1 !== arr.pw2)flag = false;
    }
    return flag;
}

Utils.removeExtraSpace = (str)=> {
    str = str.replace(/\s+/g, ' ').trim();
    return str;
}

export default Utils; 

