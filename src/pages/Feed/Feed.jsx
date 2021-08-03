import Navigation from '../../components/Navigation/Navigation';
import "./Feed.css";

export default function HomePage({ user, handleLogout }) {
    return (
        <div className="feed-container">
             <Navigation user={user.emoji} handleLogout={handleLogout} />
         </div>
    )
}