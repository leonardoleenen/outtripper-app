import React from 'react'
import DestinationCard from './destination_card'

export default () => (
  <div className="content">
    <div className="tabs">
      <input type="radio" defaultChecked name="tab" id="tab1" />
      <label htmlFor="tab1">My network</label>

      <input type="radio" name="tab" id="tab2" />
      <label htmlFor="tab2">Invitations</label>

      <input type="radio" name="tab" id="tab3" />
      <label htmlFor="tab3">All</label>


      <div className="tab"><DestinationCard /></div>
      <div className="tab">Invitations</div>
      <div className="tab">All</div>


    </div>


    <style jsx>
      {
        `
        .content{
          padding:16px;
        }
        div.tabs input{ display:none;  min-width:30%;}
        div.tabs label{ 
          font-family: Open Sans;
          font-style: normal;
          font-weight: 600;
          font-size: 18px;
          line-height: 28px;
          align-items: center;
          text-align: center;
          letter-spacing: 0.1px;
          color: #718096;
          cursor:pointer;
          padding:15px 20px;
          margin:auto;
         
        }
        div.tabs input:checked + label{  
          border-bottom:2px solid #FF7D00;
          color: #3B414B;
        }
        div.tabs div.tab{ display:none; clear:left; margin-top:50px}
        
        div.tabs input:nth-of-type(1):checked ~ .tab:nth-of-type(1),
        div.tabs input:nth-of-type(2):checked ~ .tab:nth-of-type(2),
        div.tabs input:nth-of-type(3):checked ~ .tab:nth-of-type(3){ display:block;}
        
        
         
            `
      }

    </style>
  </div>
)
