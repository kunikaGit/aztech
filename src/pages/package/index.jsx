import Plans from "../../component/plans"
import "./package.scss"
const Packages = () => {

  return (
    <div className='dahboard-wrapped'>
          <section className='choose-plan'>

      <div className='flex-container'>
        <div className='blue-card'>
          <div className='content'>
            <h3>🎯 Our Packages</h3>
            <p>Here are the packages include products. Please click to see the products list in the perticular plan.</p>
          </div>


        </div>
        
      </div>
      <Plans/>
      </section>

    </div>
  )
}

export default Packages