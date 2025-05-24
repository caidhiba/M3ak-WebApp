import React from 'react';
/*  rooms_with_other_user = [
        {'id': room.id, 'other_user': room.get_autre_user_room(person_current).user_compte.first_name} for room in rooms
    ] */
const ContactList = ({ listusers, onSelectUser }) => {// affiche la liste des contacte de user corant 
    // on ajoute que le user choisit le contact et on l'affiche dans le chat les session active entre les deux utilisateurs
return (
    <div className="ContactList">
        {/* Liste des contacts */}
        <div>
            <ul>
                {/** on affiche le autre user qui est a une conversation avec le user courant **/}
                {listusers.map((userWrapper, index) => (
                    <li key={index} >
                      <div  onClick={() => onSelectUser(userWrapper)} className="contact">{/**userWrapper.user */} 
                        {/** userWrapper.user.photo*/}
                        <img src={`http://127.0.0.1:8000${userWrapper.user.photo}`} alt="User" class={`w-8 h-8 rounded-full`}></img>             
                          <h3>
                            {userWrapper.user.first_name} {userWrapper.user.last_name}
                          </h3>
                          <p className='user-comment'>{userWrapper.user.sexe}</p>
                      </div>  
                    </li>
                ))}
            </ul>
        </div>
    </div>
    );
};

export default ContactList;



/**
 * 
 * [
  {
    "id": 1,// le id si thyrapsie ou patient
    "user": {
      "id": 5,
      "first_name": "Jean",
      "last_name": "Dupont",
      "photo": "http://exemple.com/media/photos/therapeute1.jpg"
    }
  },
  {
    "id": 2,
    "user": {
      "id": 7,
      "first_name": "Claire",
      "last_name": "Martin",
      "photo": "http://exemple.com/media/photos/therapeute2.jpg"
    }
  }
]

 */
/** <div className="Contactes card">
            <div className="card-header">
                <h5>Contacts</h5>
            </div>
            <div className="Contactes_liste card-body">
                <ul className="list-group">
                    {rooms.map((room, index) => (
                        <li key={index} className="list-group-item">
                            <p onClick={() => onRoomSelect(room.id)} clpssName="d-flex justify-content-between align-items-center">
                               Room {room.other_user}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>*/