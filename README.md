![d005d89e-ff25-4450-9119-aa56ff0d8949](https://user-images.githubusercontent.com/3274103/31629229-4859fe88-b2b3-11e7-85fb-66c35710f607.png)

![Software License][ico-license]

**WORK IN PROGRESS**

Pupper stands for "PHP Plus React" (PPR -> Pupper). The goal is to make a Framework that takes the best of both technologies and makes them communicate bi-directionnaly.

[See pupper on Github for more information](https://github.com/bouiboui/pupper/tree/master/app)

## API
### SocketProvider

`SocketProvider` takes a WebSocket as a prop and hydrates it to its child components.

It can automatically bind them by using the `bindTo` prop, that can be overwritten.

```jsx harmony
const globalSocket = new WebSocket('ws://127.0.0.1:1337/ws');

<SocketProvider socket={globalSocket} bindTo='customEvent'>
    
    {/* becomes <CustomComponent socket={globalSocket} bindTo='customEvent'/> */}
    <CustomComponent/>
       
    {/* becomes <OtherComponent socket={globalSocket} bindTo='otherEvent'/> */}
    <CustomComponent bindTo='otherEvent' />
    
</SocketProvider>
```

### withSocket

`withSocket` ables a component to be provided by `SocketProvider`.
```jsx harmony
export default withSocket(MyComponent)
```
---

### SocketListener

`SocketListener` is the Component you want to extend whenever you want to **receive** updates for an event. 

Overwrite its `onData` method to define what to do with the value.

```jsx harmony
class CustomerLogger extends SocketListener {
    onData(value) {
        console.log('Customer has logged', value);
    }
}

// Usage
<CustomerLogger bindTo='customerHasLogged'/>
```

### SocketDispatcher

`SocketDispatcher` is the Component you want to extend whenever you want to **send** event updates. 

Invoke its `onSubmit` method to send a new event with its `toSubmit` prop value.

```jsx harmony
class LoginButton extends SocketDispatcher {
    render() {
        return <button onClick={this.onSubmit}>Submit</button>
    }
}

// Usage
<LoginButton toSubmit={this.state.customerId} bindTo='customerHasLogged'/>
```

## Credits

- [bouiboui][link-author]
- [All Contributors][link-contributors]

## License

Unlicense. Please see [License File](LICENSE.md) for more information.

[ico-license]: https://img.shields.io/badge/license-Unlicense-brightgreen.svg?style=flat-square

[link-author]: https://github.com/bouiboui
[link-contributors]: ../../contributors
