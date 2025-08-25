export default function ActivePenalties() {
    return (
        <div className="cmn-box-wrapper">
            <table className="table">
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Player No</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Home</td>
                        <td><span className="number">12</span></td>
                        <td><span className="time">05 : 25</span></td>
                    </tr>
                    <tr>
                        <td>Away</td>
                        <td><span className="number">5</span></td>
                        <td><span className="time">10 : 25</span></td>
                    </tr>
                    <tr>
                        <td>Home</td>
                            <td><span className="number">88</span></td>
                        <td><span className="time">05 : 25</span></td>
                    </tr>
                    <tr>
                        <td>Away</td>
                        <td><span className="number">5</span></td>
                        <td><span className="time">10 : 25</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}