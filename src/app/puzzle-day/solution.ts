import {inject, Injectable} from '@angular/core';
import {PUZZLE_INPUT} from "./puzzle-input";
import {InputUtils} from "../utils/services/input-utils";

@Injectable()
export abstract class Solution<InputType = string, ResultType = string> {

  private rawInput: string = inject(PUZZLE_INPUT);
  private inputUtils: InputUtils = inject(InputUtils);

  abstract problemName: string;

  constructor() {
  }

  protected transform(rawInput: string): InputType {
    console.debug("Aucune fonction de transformation n'a été définie pour ce puzzle.");
    return rawInput as unknown as InputType;
  }

  generateResult(): ResultType {
    return this.process(this.transform(this.rawInput));
  }

  protected abstract process(input: InputType): ResultType;
}
