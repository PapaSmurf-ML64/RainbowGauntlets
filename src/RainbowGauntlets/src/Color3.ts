const DEG2RAD = 0.017453292;

export class Color3 
{
    public r: number = 0;
    public g: number = 0;
    public b: number = 0;

    public constructor(_r: number = 0, _g: number = 0, _b: number = 0) 
    {
        this.r = _r;
        this.g = _g;
        this.b = _b
    }

    public div(rhs: number) : Color3 {
        return new Color3(Math.floor(this.r / rhs), Math.floor(this.g / rhs), Math.floor(this.b / rhs));
    }

    public mul(rhs: number) : Color3 {
        return new Color3(Math.floor(this.r * rhs), Math.floor(this.g * rhs), Math.floor(this.b * rhs));
    }

    public toPercent() : Color3 
    {
        return new Color3(this.r / 255, this.g / 255, this.b / 255);
    }

    public clamped() : Color3
    {
        return new Color3(
            this.r > 255 ? 255 : this.r < 0 ? 0 : this.r,
            this.g > 255 ? 255 : this.g < 0 ? 0 : this.g,
            this.b > 255 ? 255 : this.b < 0 ? 0 : this.b
        );
    }

    public toString() : string {
        return "( " + this.r.toString() + ", " + this.g.toString() + ", " + this.b.toString() + " )";
    }
}


