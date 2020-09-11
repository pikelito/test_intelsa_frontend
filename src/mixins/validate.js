import { extend } from 'vee-validate';
import moment from 'moment'

extend('minIngreso', {
	validate(value) {		
		var date=new Date()		
        var date=moment(date).format()
		var anoHoy = moment(date).format('YYYY')
		var mesHoy = moment(date).format('MM')
		var ano = moment(value).format('YYYY')
		var mes = moment(value).format('MM')

		var fecha1=moment(anoHoy+'-'+mesHoy+'-01')
		var fecha2=moment(ano+'-'+mes+'-01')

		var diff= parseInt(fecha2.diff(fecha1, 'months'))
		if (diff<-1 || diff>1) {
			return false;
		  }  
		  return true;		
	},
	message: 'Fecha fuera de rango permitido'
});
extend('email', {
	validate(value) {
		return value.includes("@");		   		
	},
	message: 'No es un Email valido'
});
extend('minNumber', {
	validate(value, { min }) {
		if (parseInt(value)  > min) {
			return true;
		  }  		
	},
	params: ['min'],
	message: 'Debe ser mayor a {min}'
});
extend('maxNumber', {
	validate(value, { max }) {
		if (parseInt(value) < max) {
			return true;
		  }  		
	},
	params: ['max'],
	message: 'Debe ser menor que {max}'
});
extend('minLength', {
	validate(value, { minlength }) {
		if (value.toString().length >= minlength) {
			return true;
		}  		
	},
	params: ['minlength'],
	message: 'Mínimo {minlength} caracteres'
});
extend('maxLength', {
	validate(value, { maxlength }) {
		if (value.toString().length <= maxlength) {
			return true;
		}  		
	},
	params: ['maxlength'],
	message: 'Máximo {maxlength} caracteres'
});
extend('required', {
	validate (value) {	
	  return {
		required: true,
		valid: ['', null, undefined].indexOf(value) === -1
	  };
	},
	computesRequired: true,
	message: 'Campo requerido'
  });
