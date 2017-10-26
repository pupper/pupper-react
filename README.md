![d005d89e-ff25-4450-9119-aa56ff0d8949](https://user-images.githubusercontent.com/3274103/31629229-4859fe88-b2b3-11e7-85fb-66c35710f607.png)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/50309dd39f0f4c4cb160f779050b710a)](https://www.codacy.com/app/bouiboui/pupper-react?utm_source=github.com&utm_medium=referral&utm_content=pupper/pupper-react&utm_campaign=badger)
![Software License][ico-license] ![](https://nodesecurity.io/orgs/pupper/projects/6ea466cc-ad8c-4032-8d7a-3105c1dc4832/badge) [![bitHound Overall Score](https://www.bithound.io/github/pupper/pupper-react/badges/score.svg)](https://www.bithound.io/github/pupper/pupper-react)

Pupper stands for "PHP Plus React" (PPR > Pupper). The goal is to make a Framework that takes the best of both technologies and makes them communicate bi-directionnaly.

[See pupper on Github for more information](https://github.com/bouiboui/pupper/tree/master/app)

## API
### SocketProvider

`SocketProvider` takes a WebSocket as a prop and hydrates it to its child components.

It can automatically bind them by using the `bindTo` prop, that can be overwritten.

```jsx
const globalSocket = new WebSocket('ws://127.0.0.1/ws');

<SocketProvider socket={globalSocket} bindTo='customEvent'>
    
    {/* becomes <CustomComponent socket={globalSocket} bindTo='customEvent'/> */}
    <CustomComponent/>
       
    {/* becomes <OtherComponent socket={globalSocket} bindTo='otherEvent'/> */}
    <CustomComponent bindTo='otherEvent' />
    
</SocketProvider>
```

### withSocket

`withSocket` ables a component to be provided by `SocketProvider`.
```jsx
export default withSocket(MyComponent)
```
---

### EventListener

`EventListener` is the Component you want to extend whenever you want to **receive** updates for an event. 

Overwrite its `onData` method to define what to do with the value.

```jsx
class CustomerLogger extends EventListener {
    onData(value) {
        console.log('Customer has logged', value);
    }
}

// Usage
<CustomerLogger bindTo='customerHasLogged'/>
```

### EventDispatcher

`EventDispatcher` is the Component you want to extend whenever you want to **send** event updates. 

Invoke its `onSubmit` method to send a new event with its `toSubmit` prop value.

```jsx
class LoginButton extends EventDispatcher {
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
