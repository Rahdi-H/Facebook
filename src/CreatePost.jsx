import React, { useContext, useState } from 'react'
import './CreatePost.css'
import { Avatar } from '@mui/material'
import VideocamIcon from '@mui/icons-material/Videocam';
import FilterIcon from '@mui/icons-material/Filter';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import UserContext from './context/UserContext';
import supabase from '../supabase_config';

function CreatePost() {
    const {user} = useContext(UserContext)
    const [caption, setCaption] = useState('')
    const [image, setImage] = useState('')
    const [imageURL, setImageURL] = useState('')
    async function handleSubmit(e) {
        e.preventDefault()
        var url = ''
        // db stuff
        if (image != ''){
            try {
                const {data, error} = await supabase
                .storage
                .from('Photos')
                .upload(`${user.user_id}/${image.name}`, image)
                if (data && error == null){
                    console.log(data, error);
                    url = "https://acprtmcegjmctytrhkom.supabase.co/storage/v1/object/public/Photos/"+data.path
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        try {
            const {data, error} = await supabase
            .from('Posts')
            .insert({
                user_id:user.user_id, caption:caption, image:url, username: `${user.firstname} ${user.lastname}`, user_photo: user.photo
            })
            if (data && error == null) {
                console.log(data, 'success');
            }
        } catch (error) {
            console.log(error.message);
        }

        setCaption('')
        setImage('')
    }
  return (
    <div className='createPost'>
        <div className='createPost__top'>
            <Avatar />
            <form>
                <input value={caption} onChange={(e)=> setCaption(e.target.value)} className='createPost__textInput' placeholder={`What's on your mind? ${user.firstname} ${user.lastname}`} type="text" />
                <button className='createPost__submit' onClick={handleSubmit}>POST</button>
            </form>
        </div>
            {image ? 
            <div>
                <img style={{width: "50%", justifyContent: 'center', display:'flex'}} src={URL.createObjectURL(image)} alt="" />
            </div>
            :""}
        <div className='createPost__bottom'>
            <div className='createPost__option'>
                <VideocamIcon style={{color: 'red'}} />
                <h4>Live video</h4>
            </div>
            <label htmlFor="file">
            <div className='createPost__option'>
                <FilterIcon style={{color: 'green'}} />
                <input type="file" id='file' hidden onChange={(e)=>setImage(e.target.files[0])}/>
                <h4>Photo/Video</h4>
            </div>
            </label>
            <div className='createPost__option'>
                <InsertEmoticonIcon style={{color: 'yellow'}} />
                <h4>Feeling/Activity</h4>
            </div>
        </div>
    </div>
  )
}

export default CreatePost