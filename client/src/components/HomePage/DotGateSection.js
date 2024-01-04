import React from 'react'
import fenceVideo from '../videos/Iron fence.mp4'

const DotGateSection = () => {
    return (
        <div className="col-md-12 py-5" style={{backgroundColor: '#f2f2f2', background: 'url(assets/img/bg-grad.png)'}}>      
            <div className="container pt-5 pb-5">          
                <div className="row">
                    <div className="col-md-5 pb-3" style={{paddingTop: '4%'}}>                   
                        <h2 className="oswald-font">dotGate</h2>        
                        <p className="oswald-font">Our patent pending product dotGate ensures that the mower has the ability to autonomously move between the front and back yards when separated by a fence. An optional battery operated locking kit will soon be available that ensures that the gate remains locked when not required by the mower, preventing pets to get away through the gate. <br /><br />The dotGate was created to keep the robotic mower's feature true to its completely automated capability. Without the dotGate, the user will have to move the mower manually between fences, which defeats the purpose of a fully automated robotic lawn mower.</p>
                        <button type="button" className="btn btn-warning white-color orange-bg font-larger oswald-font shop-btn">Learn More</button>
                    </div>
                    <div className="col-md-7 px-0" style={{overflowY: 'hidden', 'border':'solid 20px #CCC', boxShadow: '5px 10px 15px #888888', backgroundColor: '#CCC'}}>    
                        <video autoPlay loop muted id="myVideo" style={{width: '100%'}} >
                            <source src={fenceVideo} type="video/mp4" />
                            Your browser does not support HTML5 video.
                        </video>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default DotGateSection
