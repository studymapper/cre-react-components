# creatella-react-components

[![NPM](https://img.shields.io/npm/v/creatella-react-components.svg)](https://www.npmjs.com/package/creatella-react-components) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
yarn add creatella-react-components

/*
 * Peer Dependencies
 */
yarn add node-sass
yarn add react
yarn add react-dom
yarn add react-router-dom                   // Button
yarn add redux                              // Alerts, Helmet
yarn add react-redux                        // Alerts, Helmet
yarn add react-helmet                       // Helmet
yarn add @fortawesome/fontawesome-svg-core  // Alerts, Checkbox, Avatar
yarn add @fortawesome/free-solid-svg-icons  // Alerts, Checkbox, Avatar
yarn add @fortawesome/react-fontawesome     // Alerts, Checkbox, Avatar
yarn add date-fns                           // Alerts
yarn add fuse.js                            // ItemPicker, ItemPickerView
yarn add zxcvbn                             // withPasswordStrength
```

## Usage

```jsx
import React, { Component } from 'react';
import Button from 'creatella-react-components/lib/Button';

// import only once
import 'creatella-react-components/lib/styles.scss';

class Example extends Component {
    render () {
        return (
            <Button isDisabled={true}>
                Press
            </Button>
        );
    }
}
```

## Configure custom styling

### 1) define the global styles & variables
```scss
// _variables.scss
$color-green: #35D367;

// _components.scss
.Button {
    &--solid-green {
        width: 150px;
        height: 50px;
        background-color: $color-green;
    }
}
```

### 2) create `config/style.js`
```js
// Pre-defined button styles classes
export const BUTTON_CLASSNAMES = {
    SOLID_GREEN: 'Button--solid-green'
};
```

### 3) In app usage
```jsx
import Button from 'creatella-react-components/lib/Button';
import { BUTTON_CLASSNAMES } from 'config/style';

<Button className={BUTTON_CLASSNAMES.SOLID_GREEN} />
```

## Components

### `<Button />`
```jsx
import Button from 'creatella-react-components/lib/Button';

<Button                         // ! Additional props will be passed to the main container
    className                   // [String]
    classNameLink               // [String]
    classNameDisabled           // [String]
    classNameProcessing         // [String]
    classNameActivityIndicator  // [String]
    label                       // [String] ! Only without children
    route                       // [String] ! Uses "react-router-dom" <Link to={route} />
    routeProps                  // [Object]
    onClick                     // [Func]
    isDisabled                  // [Bool] default: false
    isProcessing                // [Bool] default: false
    debounceTime                // [Number] default: 500 (ms)
    sizeActivityIndicator       // [Number] default: 20
/>
```

### `<ActivityIndicator />`
```jsx
import ActivityIndicator from 'creatella-react-components/lib/ActivityIndicator';

<ActivityIndicator
    className       // [String]
    classNameInfo   // [String]
    size            // [Number] default: 24
    info            // [String]
/>
```

### `<Checkbox />`
```jsx
import Checkbox from 'creatella-react-components/lib/Checkbox';

<Checkbox
    className   // [String]
    isChecked   // [Bool] !required
    onChange    // [Func] !required
    isSwitch    // [Bool] default: false
    label       // [String] ! Only without children
    value>      // [Any] will be passed as second argument to onChange
    <div />     // [Any]
</Checkbox>
```

### `<OutsideClick />`
```jsx
import OutsideClick from 'creatella-react-components/lib/OutsideClick';

<OutsideClick       // ! Additional props will be passed to the main container
    onOutsideClick  // [Func] !required
    event>          // [String] default: 'mousedown'
    <div />         // [Any] !required
</OutsideClick>
```

### `<Modal />`
```jsx
import Modal from 'creatella-react-components/lib/Modal';

<Modal
    isVisible       // [Bool] !required
    onClose         // [Func] !required
    className       // [String]
    classNameDialog // [String]
    <div />         // [Any] !required
</Modal>
```

### `<ItemPickerView />` & `<ItemPicker />`
:exclamation: By default, <ItemPicker /> is implemented in <ItemPickerView />  
To turn it off, pass `isItemPicker={false}`  
IF enabled, it takes all available props from <ItemPicker />, except:  
`isVisible`, `onClose` & `className` (use `classNameItemPicker` instead)
```jsx
import ItemPickerView from 'creatella-react-components/lib/ItemPickerView';

<ItemPickerView
    className                   // [String]
    isProcessing                // [Bool] default: false
    onChange                    // [Func] !required
    value                       // [Number | Array]
    maxSelections               // [Number] default: null
    minSelections               // [Number] default: 0
    items                       // [Array] !required
    itemsNameKey                // [String] default: 'name'
    itemsSearchConfig           // [Object] default: null see: https://fusejs.io
    renderItemContent           // [Func] default: null

    classNameItemPicker         // [String]
    isItemPicker                // [Bool] default: true
    isToggle                    // [Bool] default: true
    isInput                     // [Bool] default: false
    childrenLeft                // [Any] default: null
    childrenRight               // [Any] default: null
    placeholder                 // [String] default: ''
    placeholderInput            // [String] default: ''
    onChangeInput               // [Func] default: null
/>
```

### `<ItemPicker />`
```jsx
import ItemPicker from 'creatella-react-components/lib/ItemPicker';

<ItemPicker
    className                   // [String]
    isProcessing                // [Bool] default: false
    onChange                    // [Func] !required
    value                       // [Number | Array]
    maxSelections               // [Number] default: null
    minSelections               // [Number] default: 0
    items                       // [Array] !required
    itemsNameKey                // [String] default: 'name'
    itemsSearchConfig           // [Object] default: null see: https://fusejs.io
    renderItemContent           // [Func] default: null

    searchRenderItemTreshold    // [Number] default: 8
    isVisible                   // [Bool] !required
    onClose                     // [Func] !required
    emptyText                   // [String] default: 'No items yet'
    emptySearchText             // [String] default: 'No matches'
    searchPlaceholderText       // [String] default: 'Search..'
    outsideClickEvent           // [String] default: 'click' ! Uses <OutsideClick />
/>
```


### `<Input />` & `<InputGroup />`
```jsx
import Input from 'creatella-react-components/lib/Input';
import InputGroup from 'creatella-react-components/lib/InputGroup';

<Input
    className       // [String]
    isReadOnly      // [Bool] default: false
    isDisabled      // [Bool] default: false
    isValid         // [Bool] default: false
    isInvalid       // [Bool] default: false
    isTextArea />   // [Bool] default: false

<InputGroup
    className>      // [String]
    <Input />       // [Any] !required
</InputGroup>  
```

### `<Alerts />`
```jsx
import Alerts, { ALERTS_POSITION } from 'creatella-react-components/lib/Alerts';

<Alerts
    position // [String] !required One of {ALERTS_POSITION}
/>

// use with redux/dispatch to push alerts
import { pushAlert } from 'creatella-react-components/lib/reduxReducers/alerts';

pushAlert({
    type                // [String] !required
    message             // [String] !required
    isAutoDismiss       // [Bool] default: true
    animationDuration   // [Number] default: 500
    dismissDuration     // [Number] default: 4000
});
```

### `<Helmet />`
:exclamation: pass `location.pathname` value from `react-router-dom` as `pathname` prop  
Required to update window.location.href on metatags whenever location path changes
```jsx
import Helmet from 'creatella-react-components/lib/Helmet';

<Helmet
    pathname        // [String] !required
    defaultConfig   // [Object] !required
/>

// use with redux/dispatch to set/reset head data
// import { setHelmetData, resetHelmet } from 'creatella-react-components/lib/reduxReducers/helmet';

setHelmetData({
    description // [String]
    title       // [String]
    image       // [String]
    children    // [Any]
});

resetHelmet();
```

### `<Avatar />`
```jsx
import Avatar from 'creatella-react-components/lib/Avatar';

<Avatar
    className   // [String]
    src         // [String]
    icon        // [Object] default: faUserTie FontAwesome Icon
/>
```

### `<ErrorBoundary />`
:exclamation: pass `location.pathname` value from `react-router-dom` as `pathname` prop  
Required to recover from the error screen by the next location change
```jsx
import ErrorBoundary from 'creatella-react-components/lib/ErrorBoundary';

<ErrorBoundary
    pathname        // [String] !required
    onError         // [Func]
    errorChildren>  // [Any] default: 'Oops, an error occurred !'
    <div />         // [Any] !required
</ErrorBoundary>
```


## Higher-Order Components

### `withAsyncCaller()`
```js
import { withAsyncCaller } from 'creatella-react-components/lib/HOCs/withAsyncCaller';

export default withAsyncCaller(MyComponent);

// if faster unmount behaviour is needed on the HOC
onUnmount();
// instead of setState you can use setOwnProps
setOwnProps({ data: [] })
// usable with async/await, the last arg will always be a Axios CancelToken
apiCaller(async/promise function, arg1, arg2, arg3, ...)
// same as apiCaller without cancel token
asyncCaller()
// usable with props only, the last arg will always be a Axios CancelToken
asyncCallerProps({
    api,                // [Func] !required
    responseKey,        // [String]
    responseDataKey,    // [String]
    loadingKey,         // [String]
    onSuccess,          // [Func]
    onError,            // [Func]
}, arg1, arg2, arg3, ...)    
// same as apiCaller without cancel token
apiCallerProps()

// For custom cancellation handling
// NOTE: pass false, if you don't want the HOC to auto cancel the request on unmount
// NOTE: Don't use with apiCaller / apiCallerProps
generateCancelToken()
```

### `withThrottledChange()`
```js
import { withThrottledChange } from 'creatella-react-components/lib/HOCs/withThrottledChange';

// Default throttle: 150ms
export default withThrottledChange(MyComponent, 150);

onChangeThrottled(
    value,      // [Any]
    callback,   // [Func] !isRequired
    throttle    // [Number] default: see above
);
```

### `withWindowResizeListener()`
```js
import { withAsyncCaller } from 'creatella-react-components/lib/HOCs/withAsyncCaller';

// Default delay: 100ms
export default withAsyncCaller(MyComponent, 100);

// props
windowWidth     // window.innerWidth
windowHeight    // window.innerHeight
```

### `withForgotPassword()`
```js
import { withForgotPassword } from 'creatella-react-components/lib/HOCs/withThrottledChange';

// Default throttle: 150ms
export default withForgotPassword(
    MyComponent,
    {
        requestTitle            // [String]
        requestSuccessText      // [String]
        resetTitle              // [String]
        resetSuccessText        // [String]
        searchQueryKey          // [String]
        validatorEmail          // [Func] default: (() => true)
        validatorPassword       // [Func] default: (() => true)
        setValidatorPasswordAsync // [async Func]
        onApiRequestError       // [Func] default: (() => '')
        onApiResetError         // [Func] default: (() => '')
        apiRequest              // [async Func] !required
        apiReset                // [async Func] !required
    }
);
```

## Utils

### `ellipsisString()`
```js
import { ellipsisString } from 'creatella-react-components/lib/utils/ellipsisString';

ellipsisString(
    string,     // [String] !isRequired
    maxLength,  // [Number] !isRequired
    appendix    // [String] default: '...'
);
```

### `deepCopyObject()`
```js
import { deepCopyObject } from 'creatella-react-components/lib/utils/deepCopyObject';

deepCopyObject(object);  // [Object] !isRequired
```

### `castArray()`
```js
import { castArray } from 'creatella-react-components/lib/utils/castArray';

castArray() // [Any]
```


## License

MIT © [SchwSimon](https://github.com/SchwSimon)
