import './UserInputForm.css';
import React, { useEffect, useState } from 'react';
import { Animate } from "react-simple-animate";
import Utils from './Utility';
import { userAdd, userUpdate } from './usersSlice';
import { useDispatch, useSelector } from 'react-redux';

const UserInputForm = (props) => {
    const dispatch = useDispatch();

    const [btnName, setBtnName] = useState('Register');

    const [userData, setUserData] = useState({
        name: '',
        dob: '',
        email: '',
        phone: '',
        address: [],
        pw1: '',
        pw2: ''
    });

    const usersCount = useSelector((state) => state.users.entities.length);
    
    const [addressField, setAddressField] = useState([]);

    const userEditData = useSelector((state) =>
        state.users.entities.find((user) => user.id === props.userState.userId)
    );

    useEffect(()=>{
        if(userEditData)
        {
            setUserData(JSON.parse(JSON.stringify(userEditData)));
            const arr = [];
            for (let i=0;i<userEditData.address.length-1;i++)arr.push(i); 
            setAddressField(arr);
            setBtnName('Update');
            //setBtnName('Register');
        }
    }, [userEditData]) 
    
    const updateField = (e) => {
        e.preventDefault();
        let newInputVal = e.target.value;
        if(e.target.name === 'address')
        {
            const tempUserData = JSON.parse(JSON.stringify(userData));
            tempUserData.address[e.target.id] = newInputVal;
            setUserData(tempUserData);
        }
        else
        {
            if(e.target.name === 'name')newInputVal = newInputVal.replace(/[^a-zA-Z\s]/g, "");
            else if(e.target.name === 'phone')newInputVal = newInputVal.replace(/[^0-9]/g, "");
            else if(e.target.name === 'pw1' || e.target.name === 'pw2')newInputVal.replace(/[`().? ,[\\/\]{};:'"*_-]/g, "");
            setUserData({...userData, [e.target.name]: newInputVal});
        }
    };

    const addAddressField = (e) => {
        e.preventDefault();
        e.currentTarget.blur();
        setAddressField([...addressField, 1]);
    };

    const removeAddressField = (e, i) => {
        e.preventDefault();
        const data = [...addressField];
        data.splice(i, 1);
        setAddressField(data);
        const tempUserData = {...userData};
        tempUserData.address.splice((i+1), 1);
    };

    const closeBtnClickHandler = (e) => {
        e.preventDefault();
        props.hideFrom();
    }

    const regBtnClickHandler = (e) => {
        if(Utils.validateForm(userData))
        {
            if(btnName === 'Register')
            {     
                e.preventDefault();
                props.hideFrom();
                dispatch(
                    userAdd({
                        id: usersCount + 1,
                        name: userData.name,
                        dob: userData.dob,
                        email: userData.email,
                        phone: userData.phone,
                        address: userData.address,
                        pw1: userData.pw1,
                        pw2: userData.pw2
                    })
                );
            }
            else
            {
                e.preventDefault();
                props.hideFrom();
                dispatch(
                    userUpdate({
                        id: props.userState.userId,
                        name: userData.name,
                        dob: userData.dob,
                        email: userData.email,
                        phone: userData.phone,
                        address: userData.address,
                        pw1: userData.pw1,
                        pw2: userData.pw2
                    })
                );
            }
        }
    };

    return (
        <Animate play start={{opacity: 0}} end={{opacity: 1}}>
            <div className='reg-form-main-con'>
                <div className="reg-form-con">
                    <div className="title">Registration Form</div>
                    <div className="content">
                        <form>
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input 
                                        name='name' 
                                        type="text" 
                                        placeholder="Enter your name" 
                                        maxLength={20} 
                                        value={userData.name} 
                                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                                        onInput={(e)=>{ Utils.blockBeginSpace(e.currentTarget) }} 
                                        onChange={updateField} 
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Date of birth</span>
                                    <input 
                                        name='dob' 
                                        type="date" 
                                        value={userData.dob} 
                                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                                        max={ new Date().toISOString().split('T')[0] } 
                                        onChange={updateField} 
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input 
                                        name='email' 
                                        type="email" 
                                        value={userData.email} 
                                        pattern=".+@.+\..+" 
                                        placeholder="Enter your email" 
                                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                                        onInput={(e)=>{ Utils.blockBeginSpace(e.currentTarget) }} 
                                        title="Enter a valid email"
                                        onChange={updateField} 
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone Number</span>
                                    <input 
                                        name='phone' 
                                        type="text" 
                                        placeholder="Enter your number" 
                                        minLength={8} 
                                        maxLength={10} 
                                        value={userData.phone} 
                                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                                        onChange={updateField} 
                                        required
                                    />
                                </div>
                                <div className="input-box" id='input-box-address'>
                                    <span className="details">Address</span>
                                    <div className='address-field'>
                                        <input 
                                            id={0} 
                                            name='address' 
                                            type="text" 
                                            placeholder="Address - 1" 
                                            onInput={(e)=>{ Utils.blockBeginSpace(e.currentTarget) }} 
                                            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                                            onChange={updateField} 
                                            value={userData.address[0]?userData.address[0]:''} 
                                            required
                                        />
                                        <button className="add-btn" onClick={addAddressField} >+</button>
                                    </div>
                                    { addressField.map((emt, index) => {
                                        return (
                                            <div className='address-field' key={index}>
                                                <input 
                                                    id={index+1} 
                                                    name='address' 
                                                    type="text" 
                                                    placeholder={`Address - ${index+2}`} 
                                                    onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                                                    onChange={updateField} 
                                                    value={userData.address[index+1]?userData.address[index+1]:''} 
                                                    required
                                                />
                                                <button style={{backgroundColor:'#c34432'}} className="add-btn" onClick={(e) => removeAddressField(e, index)}>-</button>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input 
                                        name='pw1' 
                                        type="text" 
                                        placeholder="Enter your password" 
                                        pattern="^(?=.{10,})(?=.*[A-Z])(?=.*[~!@#$%^&*_+=<>]).*$" 
                                        title='Must have a minimum length of 10 characters, At least one special character and one uppercase letter.' 
                                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                                        onChange={updateField} 
                                        value={userData.pw1} 
                                        required
                                    />
                                </div>
                                <div className="input-box">
                                    <span className="details">Confirm Password</span>
                                    <input 
                                        name='pw2' 
                                        type="text" 
                                        placeholder="Confirm your password" 
                                        pattern={`${userData.pw1===userData.pw2?userData.pw1:'[false]'}`} 
                                        title="Confirm Password does't match, Try again!" 
                                        onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault(); }} 
                                        onChange={updateField} 
                                        value={userData.pw2} 
                                        required
                                    />
                                </div>
                            </div>
                            <div className='form-nav-btn-con'>
                                <button className="form-reg-btn" onClick={closeBtnClickHandler}>Close</button>
                                <button className="form-reg-btn" onClick={regBtnClickHandler}>{ btnName }</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Animate>
    )
}

export default UserInputForm;
