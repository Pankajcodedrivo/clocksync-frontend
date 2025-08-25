import goal from "../assets/images/goal.svg"
import penalty from "../assets/images/penalty.svg"
import user from "../assets/images/user.svg"
interface AddProps {
  title: string;
}
export default function LiveStatsTracker({title}: AddProps) {
    return (
        <>  
            <div className="traker-top">
                <div className="btn btn-secendary"><span><img src={goal} alt="" /></span>Goal</div>
                <h6>{title}</h6>
                <div className="btn btn-primary"><span><img src={penalty} alt="" /></span>Penalty</div>
            </div>
            <ul className="traker-list">
                <li>
                    <div className="traker-icon green">
                        <img src={goal} alt="" />
                    </div>
                    <div className="traker-content">
                        <h5>Goal by #12</h5>
                        <p>HOME - 14:23</p>
                    </div>
                </li>
                    <li>
                    <div className="traker-icon orange">
                        <img src={penalty} alt="" />
                    </div>
                    <div className="traker-content">
                        <h5>Illegal contact - #7</h5>
                        <p>AWAY - 13:45</p>
                    </div>
                </li>
                    <li>
                    <div className="traker-icon blue">
                        <img src={user} alt="" />
                    </div>
                    <div className="traker-content">
                        <h5>#3 for #15</h5>
                        <p>HOME - 12:30</p>
                    </div>
                </li>
            </ul>
        </>
    )
}