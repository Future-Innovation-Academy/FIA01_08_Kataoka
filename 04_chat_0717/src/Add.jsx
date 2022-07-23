import React from 'react'

const Add = ({
             handleInputChange1, uenoku
            , handleInputChange2, nakanoku
            , handleInputChange3, shimonoku
          }) => {

  return (
    <div>

        <h1>候補を選択して俳句を作ろう</h1>
        <div className='input-selection'>
          <select className="select-item" onChange={handleInputChange1}>
          {uenoku.map((item, index) => 
              <option value={item.uenoku}>{item.uenoku}</option>
          )}            
          </select>

          <select className="select-item" onChange={handleInputChange2}>
          {nakanoku.map((item, index) => 
              <option value={item.nakanoku}>{item.nakanoku}</option>
          )}
          </select>

          <select className="select-item" onChange={handleInputChange3}>
          {shimonoku.map((item, index) => 
              <option value={item.shimonoku}>{item.shimonoku}</option>
          )}
          </select>


        </div>
        <hr/>

        <div>


    </div>
    </div>
  )
}

export default Add