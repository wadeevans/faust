/************************************************************************
 ************************************************************************
    FAUST compiler
    Copyright (C) 2003-2020 GRAME, Centre National de Creation Musicale
    ---------------------------------------------------------------------
    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 ************************************************************************
 ************************************************************************/

///<reference path="libfaust.d.ts"/>

namespace Faust {

    // Public contructor
    export function createLibFaust(module: FaustModule) {
        return new LibFaustImp(module);
    }

    export class LibFaustImp implements LibFaust {
        private fModule: FaustModule;
        private fCompiler: LibFaust;

        constructor(module: FaustModule) {
            this.fModule = module;
            this.fCompiler = new module.libFaustWasm();
        }

        version(): string { return this.fCompiler.version(); }

        createDSPFactory(name: string, dsp_code: string, args: string, internal_memory: boolean): FaustWasm { return this.fCompiler.createDSPFactory(name, dsp_code, args, internal_memory); }

        deleteDSPFactory(cfactory: number): void { this.fCompiler.deleteDSPFactory(cfactory); }

        expandDSP(name: string, dsp_code: string, args: string): string { return this.fCompiler.expandDSP(name, dsp_code, args); }

        generateAuxFiles(name: string, dsp_code: string, args: string): boolean { return this.fCompiler.generateAuxFiles(name, dsp_code, args); }

        deleteAllDSPFactories() { this.fCompiler.deleteAllDSPFactories(); }

        getErrorAfterException(): string { return this.fCompiler.getErrorAfterException(); }

        cleanupAfterException() { this.fCompiler.cleanupAfterException(); }

        module(): FaustModule { return this.fModule; }

        toString() { return "LibFaust module: " + this.fModule + " engine: " + this.fCompiler; }
    }
}