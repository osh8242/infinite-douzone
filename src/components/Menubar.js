import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

class Menubar extends Component {
  render() {
    const { showSidebar } = this.props;
    return (
      <div
        id="meneBar"
        style={{
          width: '250px',
          height: 'calc(100% - 56px)',
          top: '56px',
          position: 'fixed',
          left: showSidebar ? '0' : '-250px',
          background: '#f8f9fa',
          transition: 'left 0.3s',
          overflow: 'hidden',
        }}
      >
        {/* 메뉴 리스트 */}
        <ListGroup variant="flush">
          <ListGroup.Item action href="#item1">
            Item 1
          </ListGroup.Item>
          <ListGroup.Item action href="#item2">
            Item 2
          </ListGroup.Item>
          <ListGroup.Item action href="#item3">
            Item 3
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

export default Menubar;

// import React from 'react';

// function Menubar({ showSidebar }) {
//   return (
//     <div
//       style={{
//         width: '250px',
//         height: 'calc(100% - 56px)',
//         top: '56px',
//         position: 'fixed',
//         left: showSidebar ? '0' : '-250px',
//         background: '#f8f9fa',
//         transition: 'left 0.3s',
//         overflow: 'hidden',
//       }}
//     >
//       {/* 메뉴 리스트 */}
//       <ul>
//         <li>
//           <a href="#item1">Item 1</a>
//         </li>
//         <li>
//           <a href="#item2">Item 2</a>
//         </li>
//         <li>
//           <a href="#item3">Item 3</a>
//         </li>
//       </ul>
//     </div>
//   );
// }

// export default Menubar;
