import { Response, Request } from "express";
import Dentist from "../models/dentists.model";

export class DentistController {
  static getDentists = async (req: Request, res: Response): Promise<void> => {
    try {
      const dentists = await Dentist.find({ enable: true });

      if (dentists.length === 0) {
        res.status(200).json({ message: "No hay dentistas registrados" });
        return;
      }

      res.status(200).json(dentists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los dentistas" });
    }
  };

  static createDentist = async (req: Request, res: Response) => {
    try {
      const { dni, name, fee } = req.body;
      const dentistExist = await Dentist.findOne({ dni });
      if (dentistExist) {
        const error = new Error("Dentista ya registrado");
        res.status(409).json({ error: error.message });
        return;
      }

      await Dentist.create(req.body);
      res.send("Dentista Creado");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear un dentista" });
    }
  };

  static deleteDentist = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const dentistExist = await Dentist.findOne({ _id: id });

      if (!dentistExist) {
        const error = new Error("Dentista no registrado");
        res.status(409).json({ error: error.message });
        return;
      }

      dentistExist.enable = false;
      await dentistExist.save();

      res.send("Dentista eliminado correctamente");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al eliminar un dentista" });
    }
  };

  static updateDenstist = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const dentistExist = await Dentist.findOneAndUpdate({ _id: id }, req.body);

      if (!dentistExist) {
        const error = new Error("Dentista no registrado");
        res.status(409).json({ error: error.message });
        return;
      }
      res.send("Dentista actualizado correctamente");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al activar un dentista" });
    }
  };

  static activeDentist = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const dentistExist = await Dentist.findOne({ _id: id });

      if (!dentistExist) {
        const error = new Error("Dentista no registrado");
        res.status(409).json({ error: error.message });
        return;
      }

      if (dentistExist.enable) {
        const error = new Error("Dentista ya se encuentra activado");
        res.status(409).json({ error: error.message });
        return;
      }

      dentistExist.enable = true;
      await dentistExist.save();

      res.send("Dentista activado correctamente");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al activar un dentista" });
    }
  };
}
