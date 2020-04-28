import React, {Component} from 'react'
import ItemForm from './itemForm'
import {connect} from 'react-redux'
import {updateSingleItem} from '../store/items'
import AdminUsersTable from './adminUsersTable'
import AdminItemsTable from './adminItemsTable'

export default function AdminView(props) {
  return (
    <div>
      {props.whichTable === 'users' && <AdminUsersTable />}
      {props.whichTable === 'items' && <AdminItemsTable />}
    </div>
  )
}

// const imageStyle = {
//   width: '100px',
//   height: 'auto',
//   padding: '5px',
// }

// class UpdateItems extends Component {
//   constructor() {
//     super()
//     this.state = {
//       name: '',
//       price: '',
//       description: '',
//       imageUrl: '',
//       quantity: '',
//       sport: '',
//     }
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this)
//   }

//   handleChange(evt) {
//     this.setState({
//       [evt.target.name]: evt.target.value,
//     })
//   }

//   handleSubmit() {
//     event.preventDefault()
//     const itemId = Number(this.props.match.params.id)
//     this.props.updateSingleItem(itemId, this.state)
//     this.setState({
//       name: '',
//       price: '',
//       description: '',
//       imageUrl: '',
//       quantity: '',
//       sport: '',
//     })
//   }

//   render() {
//     const items = this.props.items
//     let itemId = this.props.match.params.id

//     return (
//       <div>
//         <div>
//           {items.map((item) => {
//             if (String(item.id) === itemId) {
//               return (
//                 <div key={item.id}>
//                   <h3>Item: {item.name}</h3>
//                   <h3>Price: ${item.price}</h3>
//                   <h3>Description: {item.description}</h3>
//                   <img style={imageStyle} src={item.imageUrl} />
//                   <h3>Quantity: {item.quantity}</h3>
//                   <h3>Sport: {item.sport}</h3>
//                   <ItemForm
//                     {...this.state}
//                     handleChange={this.handleChange}
//                     handleSubmit={this.handleSubmit}
//                   />
//                 </div>
//               )
//             }
//             return null
//           })}
//         </div>
//       </div>
//     )
//   }
// }

// const mapState = (state) => ({
//   items: state.items,
// })

// const mapDispatch = (dispatch) => ({
//   updateSingleItem: (id, changes) => dispatch(updateSingleItem(id, changes)),
// })

// export default connect(mapState, mapDispatch)(UpdateItems)