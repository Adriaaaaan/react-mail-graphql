export default function Message({ message }) {
  //function focusRow(){}
  return (
      <a href={`#/messages/${message.id}`} className='flex' style={{ 'padding': '12px' }}>
        <div>Button</div>
        <div className='wrap-text'>{message.body}</div>
      </a>
  )
}