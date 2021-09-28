var leStyle = {
  backgroundColor: "#1b2026",
  textAlign: "center",
  padding: "20px",
  left: "0",
  bottom: "0",
  height: "100px",
  width: "100%",
}

var phantom = {
display: 'block',
padding: '20px',
height: '60px',
width: '100%',
}

function Footer({ children }) {
  return (
      <div>
          <div style={phantom} />
          <div style={leStyle}>
              { children }
          </div>
      </div>
  )
}

export default Footer