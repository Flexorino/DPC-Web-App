import { Patch } from './../services/patcherino/patch';
import { Diary } from 'src/shared/model/diary/diary';
import { createAction, props } from '@ngrx/store';

export class GeneralEffectActions {
    static PatchReady = createAction('[General DAO] PatchReady', props<{ patch: Patch }>());
    static UserPatchReady = createAction('[General DAO] UserPatchReady', props<{ patch: Patch }>());
}