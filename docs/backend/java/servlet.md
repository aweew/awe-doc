## Servlet三大组件的注册



### Servlet的注册

通过将 `ServletRegistrationBean` 注册为一个Bean。

```JAVA
@Bean
public ServletRegistrationBean servletRegistrationBean(){
    ServletRegistrationBean<TestServlet> servletRegistrationBean = new ServletRegistrationBean<>();
    servletRegistrationBean.setServlet(new TestServlet());
    servletRegistrationBean.addUrlMappings("/testServlet");
    return servletRegistrationBean;
}
```



### Filter的注册

将 `FilterRegistrationBean` 注册为一个Bean。

```JAVA
@Bean
public FilterRegistrationBean filterRegistrationBean(){
    FilterRegistrationBean<TestFilter> filterRegistrationBean = new FilterRegistrationBean<>();
    filterRegistrationBean.setFilter(new TestFilter());
    filterRegistrationBean.setUrlPatterns(Collections.singletonList("/*"));
    return filterRegistrationBean;
}
```



### Listener的注册

将 `ServletListenerRegistrationBean` 注册为一个Bean。

```JAVA
@Bean
public ServletListenerRegistrationBean listenerRegistrationBean(){
    ServletListenerRegistrationBean<TestListener> listenerRegistrationBean = new ServletListenerRegistrationBean<>();
    listenerRegistrationBean.setListener(new TestListener());
    return listenerRegistrationBean;
}
```

## Q7. 对象头



对象头通常包含两个部分（特殊情况有三部分），

**第一个部分** 用于保存对象运行时的数据，该部分又称 **MarkWord**，保存着如哈希码、GC分代年龄、锁状态标志、线程持有的锁等等信息，这部分在32位虚拟机里占32位，64位虚拟机里占64位（不开启指针压缩）。MarkWord被设计为不定长的数据结构，它会根据运行状态复用自己的存储空间(是未锁定、轻量级锁定等等)。

**第二个部分** 是类型指针，虚拟机通过这个指针确定 **这个对象是哪个类的实例**。在32位虚拟机里占32位，64位虚拟机里占64位（不开启指针压缩）。若开启指针压缩，该部分在x64位机子上只占32位，即4字节。

**第三个部分** 是当对象为数组时才存在的，主要用于记录数组的长度。占用一个int的大小，即32位。所以在x64机子上，普通对象头占用128位（16byte），数组对象头占用160位（20byte）。



# 虚拟机栈（JVM Stack）

JVMStack就是我们常说的栈，它也是线程私有的。随线程生，随线程死。当一个方法被调用时，就会创建一个栈帧—— `StackFrame` ，栈帧里面包含了 局部变量表、操作数栈、动态链接、方法出口等信息，每当一个方法执行结束后，栈帧也就相应地销毁了。



## 局部变量表

用于存放方法参数和方法内部定义的局部变量。在编译后，局部变量表的大小就确定了，具体见代码和对应的字节码：

```
// 对应的java代码
public static void main(String[] args){
   int i = 1000;
}
```

该栈帧中就包含两个局部变量：

1. `args` 
2. `i` 

![image.png](https://cdn.nlark.com/yuque/0/2020/png/432301/1590586642932-d0f79859-0cd2-4d54-bb60-41af531ef1dd.png)

局部变量表的容量以变量槽（Slot）为最小单位，虚拟机规范表示 **boolean、byte、char、short、int、float、reference或returnAddress类型的数据都应该占用1个Slot** 。注意，只要保证slot实现的效果和32位虚拟机中的一致即可，比如，在64位虚拟机中，使用了64位物理内存空间去实现一个Slot，虚拟机上仍要使用对齐和补白让Slot看起来和32位虚拟机中的一样。



其中介绍一下`reference` 这个数据类型：

- 此引用应该直接或间接地查找到对象在Java堆中的数据存放的起始地址索引
- 此引用应该直接或间接地查找到对象所属数据类型在方法区中地存储类型信息

对于64位的数据类型（double、long），虚拟机会以高位对齐的方式为其分配两个连续的Slot空间。注意，在局部变量表里，无论是否分两次读32位数据，都不会引起数据安全问题。



局部变量表的索引值范围是从0开始直最大的Slot数量，如果是 **非static** 方法，下标为0的位置默认是this引用。因为方法局部变量表在编译时就确定了，所以调用方法传入数据时，其实是传入了一个引用（待确定。



同时为了尽可能节省 **栈帧空间**，局部变量表中的Slot是可以重用的，方法体中定义的变量，其作用域不一定会覆盖整个方法，**如果该变量超出作用范围，那个变量的slot就会交给其他变量使用**。这个规则也会带来一定副作用，因为超出范围后，局部变量表不会主动断开和引用的联系，就导致某个对象一直被局部变量表持有着，可以参考下面的例子：

```
/* 共享变量 */
final int K = 1024;
final int M = 1024 * K;

/* 情况一，回收失败 */
{
    byte[] bytes = new byte[10 * M]
}
System.gc();

/* 情况二，回收成功 */
{
    byte[] bytes = new byte[10 * M];
}
int a = 0;
System.gc();
```

《Practical Java》里面讲到“把不使用的对象设置为null” 是有一定道理的，但是不推荐这样做，理由如下：

- 代码不整洁，应该以恰当的变量作用域来控制回收才是最优雅的
- JIT会堆null赋值进行优化

但是遇到这样的极端条件，还是可以一试的：对象占用内存大，此方法执行时间长，方法调用次数达不到JIT优化的的编译条件

## 操作数栈

这货就是一个栈。栈，先进后出的一个数据结构，JVM对它的操作基本就是压栈、出栈。比如看下面一段字节码：

```
public static void main(String[] args) {
    int i = 8;
}
```

其字节码如下所示：

```
bipush 8
istore_1
return
```

- `bipush 8` ，表示把数值 `8` 压入栈中，并把数值用int表示
- `istore_1` ，表示把操作数栈栈顶的值弹出，放到局部变量表序号为1的变量上
- `return` ，返回 `void` 并清空 `stack` 

## 动态链接

每个栈帧都包含一个指向运行时常量池中该栈帧所属方法的引用，持有这个引用是为了支持方法调用过程中的动态连接。在类加载阶段或者第一次使用就转换为引用，这种转换被称为静态解析。另一部分要等到每一次运行期间转换为直接引用，这部分称为动态连接。



方法调用不等同于方法执行，方法调用唯一的作用就是确定被调用方法的版本（调用哪个方法），不涉及具体运行过程。Class文件的编译过程不包含传统的连接步骤，一切方法调用在Class文件里都是符号引用，而不是方法在实际运行时内存布局中的入口地址（直接引用）。

在把符号引用转换成直接引用的过程有两种：

1. 解析，调用的方法版本一定是在编译期就确定下来的，比如静态方法、私有方法、实例构造器、父类方法四种
2. 分派，可能是静态也可能是动态，主要是重载和重写

因为调用什么方法签名的方法在编译期就已经决定了，如下所示



```
    // java代码
    Super aSuper = new Sub();
    A a = new B();
    aSuper.test(a);
```

![bytecode_example1.png](https://cdn.nlark.com/yuque/0/2020/png/432301/1590587308477-aee311fc-91a3-419d-b8c3-13cf52f53488.png)![bytecode_example1_method_ref.png](https://cdn.nlark.com/yuque/0/2020/png/432301/1590587323045-48c53399-14b1-46f4-8078-21f3029f6f6b.png)



第11行已经决定了调用Super.test(A)方法，此时称该方法为 `Resolved Method`，但是具体调用哪个实例的test(A)，需要取决以下的规则

> 假设C是一个对象的类，决定哪个方法被调用的规则如下所示：
>
> 1. 如果C声明了一个方法m并且覆盖了`Resolved Method`，那么方法m就会被调用
> 2. 否则，如果C有一个父类，那么搜索实现了 `Resolved Method` 的方法的直接父类，并向上递归查找。
> 3. 抛出异常



综上所是，截至JDK7，java是静态多分派，动态单分派（多分派指需要参考多个元素）：方法重载要考虑调用者的类型，考虑方法的参数，这些都是在编译期就固定在字节码里面了。而动态分配要到运行时，才会去查找具体的实例。



## 方法返回地址

- 正常返回，将返回值传递给上层的方法调用者
- 异常完成出口，在方法执行过程中遇到了异常，并且这个异常没有在方法内得到处理



无论采用哪种方式退出，都需要返回到方法被调用的位置，程序才能继续执行，方法返回时可能需要在栈帧中保存一些信息，用来帮助恢复它的上层方法的执行状态。一般来说，方法正常退出时，调用者的PC计数器的值可以作为返回地址；方法异常退出时，返回地址是要通过异常处理器表来确定的



方法退出的过程实际上就等同于把栈帧出栈，因此退出时可能执行的操作有：恢复上层方法的局部变量表和操作数栈，把返回值（如果有的话）压入调用者栈帧的操作数栈中，调整PC计数器的值来指向方法调用指令后的一条指令。



#### 二 、栈上分配

我们通过JVM内存分配可以知道JAVA中的对象都是在堆上进行分配，当对象没有被引用的时候，需要依靠GC进行回收内存，如果对象数量较多的时候，会给GC带来较大压力，也间接影响了应用的性能。为了减少临时对象在堆内分配的数量，JVM通过逃逸分析确定该对象不会被外部访问。那就通过标量替换将该对象分解在栈上分配内存，这样该对象所占用的内存空间就可以随栈帧出栈而销毁，就减轻了垃圾回收的压力。