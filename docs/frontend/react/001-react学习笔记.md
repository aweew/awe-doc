# React学习笔记

------

### React简介

#### 1. React是什么

React是一个将数据渲染为HTML视图的开源JavaScript库。它只关注视图（构建用户界面）

#### 2. 原生JS有什么痛点

- 原生JavaScript操作DOM繁琐、效率低（用DOM-API操作UI）

- 使用JavaScript直接操作DOM，浏览器会进行大量的重绘重排

- 原生JavaScript没有`组件化`编码方案，代码复用率低

#### 3. React有什么优点

- 采用`组件化`模式、`声明式`编码，提高开发效率及组件复用率

> 区别于`命令式`，命令式是一步一步的按过程来编码，需要以具体代码表达在哪里（where）做什么（what），如何实现（how）。声明式是直接列出需要的结果，只需要声明在哪里（where）做声明（what），而无需关心如何实现（how）

- 在React-Native中可以使用React语法进行移动端开发

> React-Native是可以通过JavaScript编写安卓和IOS应用的一门技术

- 使用`虚拟DOM`+优秀的`Diffing算法`，尽量减少与真实DOM的交互（JS和JQuery都是操作真实的DOM）

数据 -> 虚拟DOM -> 真实DOM （通过Diffing算法比较DOM并复用DOM，最小化页面重绘）

#### 4. 相关JS库

- `babel.js`转译，可以将ES6转成ES5，react不是原生JS，实际上是JSX，可以将JSX转成原生JS

- `react.development.js`react核心库

- `react-dom.development.js`react扩展库，操作dom

#### 5. 虚拟DOM是什么

1. 本质是一个Object类型的对象

2. 虚拟DOM比较轻

3. 虚拟DOM最终会被React转化成真实DOM，呈现在页面上

4. 创建虚拟DOM的两种方式

   - 纯JS方式（一般不用）

     ```javascript
     <script type="text/javascript">
         // 1.创建虚拟DOM
         const VDOM = React.createElement('h1', {id: 'title'}, 'hello react');
         // 2.渲染虚拟DOM到页面
         ReactDOM.render(VDOM, document.getElementById('test'))
     </script>
     ```

   - JSX

     ```javascript
     <script type="text/babel">
         // 1.创建虚拟DOM
         const VDOM = <h1 id="title">hello react</h1>
         // 2.渲染虚拟DOM到页面
         ReactDOM.render(VDOM,document.getElementById('test'))
     </script>
     ```

     > 注意上面两种方式的script type类型的区别



### 组件

#### 1. 模块和组件概念

- 模块

  向外提供特定功能的js程序, 一般就是一个js文件。随着业务逻辑增加，代码越来越多且复杂。

  作用是复用js, 简化js的编写, 提高js运行效率

- 组件

  用来实现局部功能效果的代码和资源的集合(html/css/js/image等等)，作用是复用代码, 简化项目编码, 提高运行效率

#### 2. 组件种类

- 函数式组件（很少用）

  ```javascript
  <script type="text/babel">
      // 1.创建函数式组件
      function MyComponent1(){
          return <h2>我是自定义函数式组件</h2>
      }
  
      // 2.渲染虚拟DOM到页面
      ReactDOM.render(<MyComponent1/>, document.getElementById('test'));
  </script>
  ```

  

- 类式组件

  ```javascript
  <script type="text/babel">
      class MyComponent2 extends React.Component {
          render() {
              return (
                  <div>
                      <h1>我是一个类组件</h1>
                  </div>
              );
          }
      }
  
      ReactDOM.render(<MyComponent/>, document.getElementById('test'));
  </script>
  ```

  

- 一些规范：

  1. 组件名必须首字母大写

  2. 虚拟DOM元素只能有一个根元素

  3. 虚拟DOM元素必须有结束标签

- 类组件渲染流程：

  1. React内部会创建组件实例对象
  2. 调用`render()`得到虚拟DOM, 并解析为真实DOM
  3. 插入到指定的页面元素内部

#### 3. 组件3大核心之state

- 概念

  1. `state`是组件对象最重要的属性, 值是对象(可以包含多个key-value的组合)
  2. 组件被称为"状态机", 通过更新组件的state来更新对应的页面显示(重新渲染组件)

- 注意

  1. 组件中render方法中的this为组件`实例对象`
  2. 组件自定义的方法中this为`undefined`（这里需要特别注意）
  3. 状态数据不能直接修改或更新，需要通过`this.setState({ })`更新

- 示例

  ```javascript
  <script type="text/babel">
      class MyComponent extends React.Component {
  
          // 组件状态是一个对象
          state = {
              isHot: false
          }
  
          // 相当于给组件定义了一个属性
          changeWeather = () => {
              this.setState({isHot: !this.state.isHot})
          }
  
          render() {
              return (
                  <div>
                      <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h1>
                  </div>
              );
          }
      }
  
      // 渲染DOM
      ReactDOM.render(<MyComponent/>, document.getElementById('test'))
  </script>
  ```

#### 4. 组件3大个核心之props

- 概念

  1. 每个组件对象都会有props(properties的简写)属性

  2. 组件标签的所有属性都保存在`props`中

- 作用

  1. 通过标签属性从组件外向组件内传递变化的数据
  2. 组件内部不允许修改props数据

- 用法

  - 直接传值

    ```javascript
    <script type="text/babel">
    
        class MyComponent extends React.Component {
    
            render() {
                return (
                    <div>
                        <ul>
                            <li>姓名：{this.props.name}</li>
                            <li>年龄：{this.props.age}</li>
                            <li>性别：{this.props.sex}</li>
                        </ul>
                    </div>
                );
            }
        }
    
        ReactDOM.render(<MyComponent name="tom" age={18} sex="男"/>, document.getElementById('test1'))
    </script>
    ```

    这里数字的写法是`age={18}`

  - 批量传值

    ```javascript
    <script type="text/babel">
    
        class MyComponent extends React.Component {
    
            render() {
                return (
                    <div>
                        <ul>
                            <li>姓名：{this.props.name}</li>
                            <li>年龄：{this.props.age}</li>
                            <li>性别：{this.props.sex}</li>
                        </ul>
                    </div>
                );
            }
        }
    
        const p = {"name": "jerry", "age": 19, "sex": "女"}
    
        ReactDOM.render(<MyComponent {...p}/>, document.getElementById('test2'))
    </script>
    ```

    这里`{...p}`是拷贝一个对象

  - 对props的值进行限制

    - 在组件外部定义（不常用）

      ```javascript
      <script type="text/babel">
      
          class MyComponent extends React.Component {
      
              render() {
                  return (
                      <div>
                          <ul>
                              <li>姓名：{this.props.name}</li>
                              <li>年龄：{this.props.age}</li>
                              <li>性别：{this.props.sex}</li>
                          </ul>
                      </div>
                  );
              }
          }
      
          MyComponent.propTypes = {
              name: PropTypes.string.isRequired
          }
      
          MyComponent.defaultProps = {
              age: 18
          }
      
          const p = { "sex": "女"}
      
          ReactDOM.render(<MyComponent {...p}/>, document.getElementById('test2'))
      </script>
      ```

      

    - 在组件内部定义

      ```javascript
      <script type="text/babel">
      
          class MyComponent extends React.Component {
      
              static propTypes = {
                  name: PropTypes.string.isRequired
              }
      
              static defaultProps = {
                  age: 18
              }
      
              render() {
                  return (
                      <div>
                          <ul>
                              <li>姓名：{this.props.name}</li>
                              <li>年龄：{this.props.age}</li>
                              <li>性别：{this.props.sex}</li>
                          </ul>
                      </div>
                  );
              }
          }
      
          const p = { "sex": "女"}
      
          ReactDOM.render(<MyComponent {...p}/>, document.getElementById('test2'))
      </script>
      ```

      