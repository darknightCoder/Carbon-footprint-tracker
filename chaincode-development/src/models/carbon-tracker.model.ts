export class Boiler {
    public boilerID;
    public industryName;
    public industryType;
    public latitude;
    public longitude;
};
export class BoilerData {
    public boilerID;
    public gaseous: GaseousParams[];
    public liquid: LiqidParams[];
}
export class GaseousParams {
    public NH3;
    public NOx;
    public suphor;
    public phosphorus;
    public CO;
    public CO2;
    public SO2;
    public CH4;
}

export class LiqidParams {
   public alchohol;
   public benzene;
   public silicon;
}

