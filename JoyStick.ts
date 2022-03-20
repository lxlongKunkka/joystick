// 在此处添加您的代码
enum DIR {
    NONE = 0,
    U = 1,
    D = 2,
    L = 3,
    R = 4,
    U_L = 5,
    U_R = 6,
    D_L = 7,
    D_R = 8
}

enum KEY {
    P = 0,
    A = 1,
    B = 2,
    C = 3,
    D = 4,
    E = 5,
    F = 6
}

let JoyStick_P = DigitalPin.P8;
let JoyStick_X = AnalogPin.P1;
let JoyStick_Y = AnalogPin.P2;
let KEY_A = DigitalPin.P5;
let KEY_B = DigitalPin.P11;
let KEY_C = DigitalPin.P15;
let KEY_D = DigitalPin.P14;
let KEY_E = DigitalPin.P13;
let KEY_F = DigitalPin.P12;


//% weight=20 color=#3333FF icon="\uf11b"
namespace JoyStick
{
    let Read_X = 0, Read_Y = 0;

    //% blockID==JoyStickInit 
    //% block="JoyStickInit"
    //% weight=100
    export function JoyStickInit(): void
    {
        pins.setPull(JoyStick_P, PinPullMode.PullUp);
        pins.setPull(KEY_A, PinPullMode.PullUp);
        pins.setPull(KEY_B, PinPullMode.PullUp);
        pins.setPull(KEY_C, PinPullMode.PullUp);
        pins.setPull(KEY_D, PinPullMode.PullUp);
        pins.setPull(KEY_E, PinPullMode.PullUp);
        pins.setPull(KEY_F, PinPullMode.PullUp);

        Read_X = pins.analogReadPin(JoyStick_X);
        Read_Y = pins.analogReadPin(JoyStick_Y);
    }

    //% blockID==Listen_Key
    //% block="Key %pin |Press"
    //% weight=90
    export function Listen_Key(pin: KEY): boolean
    {
        let Val = 2;
        switch(pin)
        {
            case KEY.P:
                Val = pins.digitalReadPin(JoyStick_P);
            case KEY.A:
                Val = pins.digitalReadPin(KEY_A);
            case KEY.B:
                Val = pins.digitalReadPin(KEY_A);
            case KEY.C:
                Val = pins.digitalReadPin(KEY_A);
            case KEY.D:
                Val = pins.digitalReadPin(KEY_A);
            case KEY.E:
                Val = pins.digitalReadPin(KEY_A);
            case KEY.F:
                Val = pins.digitalReadPin(KEY_A);
        }
        if(Val == 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    //% blockID==onKey 
    //% block="Key %pin |Press"
    //% weight=80
    export function onKey(pin: KEY, body: Action): void 
    {
        let Pin = 0;
        switch(Pin)
        {
            case KEY.P:
                Pin = JoyStick_P;
                break;
            case KEY.A:
                Pin = KEY_A;
                break;
            case KEY.B:
                Pin = KEY_B;
                break;
            case KEY.C:
                Pin = KEY_C;
                break;
            case KEY.D:
                Pin = KEY_D;
                break;
            case KEY.E:
                Pin = KEY_E;
                break;
            case KEY.F:
                Pin = KEY_F;
                break;
            default:
                break;
        }
        pins.onPulsed(Pin, PulseValue.Low, body);
    }

    //% blockID==Listen_Dir 
    //% block="DIR Dir %pin"
    //% weight=70
    export function Listen_Dir(Dir: DIR): boolean
    {
        let Get_Dir = DIR.NONE;

        let New_X = pins.analogReadPin(AnalogPin.P1);
        let New_Y = pins.analogReadPin(AnalogPin.P2);

        let Right = New_X - Read_X;
        let Left  = Read_X - New_X;
        let Up    = New_Y - Read_Y;
        let Down  = Read_Y - New_Y;

        let Dx = Math.abs(Read_X - New_X);
        let Dy = Math.abs(New_Y - Read_Y);

        let Precision = 150;

        if(Right > Precision && Dy < Precision)
        {
            Get_Dir = DIR.R;
        } 
        else if (Left > Precision && Dy < Precision) 
        {
            Get_Dir = DIR.L;
        } 
        else if (Up > Precision && Dx < Precision) 
        {
            Get_Dir = DIR.U;
        } 
        else if (Down > Precision && Dx < Precision) 
        {
            Get_Dir = DIR.D;
        } 
        else if (Right > Precision && Up > Precision) 
        {
            Get_Dir = DIR.U_R;
        } 
        else if (Right > Precision && Down > Precision) 
        {
            Get_Dir = DIR.D_R;
        } 
        else if (Left > Precision && Up > Precision) 
        {
            Get_Dir = DIR.U_L;
        } 
        else if (Left > Precision && Down > Precision) 
        {
            Get_Dir = DIR.D_L;
        } 
        else 
        {
            Get_Dir = DIR.NONE;
        }

        if(Get_Dir == Dir)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}