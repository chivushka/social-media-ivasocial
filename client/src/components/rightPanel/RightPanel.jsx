import "./rightPanel.scss"

const RightPanel = () => {
  return (
    <div className="rightPanel">
      <div className="container">

        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/4946594/pexels-photo-4946594.jpeg" alt="" />
              <span>Jane Nilsen</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/4946594/pexels-photo-4946594.jpeg" alt="" />
              <span>Jane Nilsen</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        </div>

        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/4946594/pexels-photo-4946594.jpeg" alt="" />
              <p>
                <span>Angel Nilsen</span> changed cover picture
              </p>
            </div>
            <span className="data">1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/4946594/pexels-photo-4946594.jpeg" alt="" />
              <p>
                <span>Angel Nilsen</span> posted
              </p>
            </div>
            <span className="data">15 min ago</span>
          </div>
        </div>

        <div className="item">
        <span>Contacts</span>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/4946594/pexels-photo-4946594.jpeg" alt="" />
              <div className="contact" />
              <span>Angel Nilsen</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/4946594/pexels-photo-4946594.jpeg" alt="" />
              <div className="contact" />
              <span>Angel Nilsen</span>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src="https://images.pexels.com/photos/4946594/pexels-photo-4946594.jpeg" alt="" />
              <div className="contact" />
              <span>Angel Nilsen</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RightPanel