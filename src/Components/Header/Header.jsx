import './Header.css'
export default function Header(){
    return(
        <header>
            <div className="dark-logo-holder">
                <img src="src/assets/dark-logo.webp" alt="logo dark" />
            </div>
            <div className="header-elements">
                <span className="header-element">Therapists List</span>
                <span className="header-element">Find A Therapist</span>
                <span className="header-element">Contact</span>
                <span className="header-element">Business</span>
                <span className="header-element">Shop books</span>
                <button className="Login-button">Log In</button>
                <button className="Signin-button">Sign In</button>
            </div>
               
           
        </header>

    )
}