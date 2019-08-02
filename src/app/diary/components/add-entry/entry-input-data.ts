export class EntryInputData {

    public bloodSugar?: number;
    public carbs?: number;
    public mealBolus?: number;
    public correctionBolus?: number;
    public basal?: number;
    public tempBasalChange?: number;
    public temBasalChangeDuration?: string;
    public tags: Array<string>;
    public activityDescription: string;
    public activityDuration: string;
    public activityStrain: string;
    public comment: string;
constructor(public date: string, public time: string) { }
}
