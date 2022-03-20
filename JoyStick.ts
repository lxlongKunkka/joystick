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

namespace JoyStick
{
    let Read_X = 0, Read_Y = 0;

    //% blockID == JoyStickInit 
    //% block = "JoyStickInit"
    //% weight = 100
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

    //% blockID == Listen_Key
    //% block = "Key %pin |Press"
    //% weight = 100
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
}