
[TOC]

## 枚举定义

<a id='AssetStatus'></a>

```csharp
/* 设施状态的枚举 */
enum AssetStatus
{
	Normal,			//0：正常
	Fault,  		//1：故障
	Disabled, 		//2：拆除(废弃)
	Suspended,  	//3：停用(备案)
	Unused,   		//4：未启用(未交付)
	Unknown = 99,	//99：未知
}
```

<a id='DeviceStatus'></a>

```csharp
/* 设备状态的枚举 */
enum DeviceStatus
{
	Normal,			//0：正常
	Fault,  		//1：故障
	Disabled, 		//2：拆除(废弃)
	Suspended,  	//3：停用(备案)
	Unused,   		//4：未启用(未交付)
	Unknown = 99,	//99：未知
}
```