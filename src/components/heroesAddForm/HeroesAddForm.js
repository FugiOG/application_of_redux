import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { heroCreated } from '../heroesList/heroesSlice';
import { selectAll } from '../heroesFilters/filtersSlice';
import store from '../../store';
import "./heroesAddForm.scss";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => { 

    const { filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState())
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (value) => {
        const {name, text, element} = value;

        const id = uuidv4();
        const newHero = {id, name, description: text, element}
        request("http://localhost:3001/heroes", 'POST', JSON.stringify(newHero))
            .then(dispatch(heroCreated(newHero)))
            .catch(err => console.log(err));
    } 

    const renderFilters = (filters, status) => {
        if (status === 'loading'){
            return <option>Загрузка элементов</option>
        } else if (status === 'error'){
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // if (name === 'all') return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <Formik
            initialValues={{
                name: '',
                text: '',
                element: ''
            }}
            validationSchema= {Yup.object({
                name: Yup.string()
                        .min(2, 'Минимум 2 символа!')
                        .required('Обязательное поле!'),
                text: Yup.string().min(10, 'Не менее 10 символов')
                        .required('Обязательное поле!'),
                element: Yup.string()
                        .required('Необходимо выбрать элемент героя')
            })}
            onSubmit={onSubmitHandler}>
            <Form className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"
                        />
                    <ErrorMessage className="error" name="name" component="div"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field
                        required
                        name="text" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}
                        as="textarea"/>
                    <ErrorMessage className="error" name="text" component="div"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field 
                        required
                        className="form-select" 
                        id="element" 
                        name="element"
                        as="select">
                        {renderFilters(filters, filtersLoadingStatus)}
                    </Field>
                    <ErrorMessage className="error" name="element" component="div"/>
                </div>

                <button type="submit" className="btn btn-primary">Создать</button>
            </Form>
        </Formik>
        
    )
}

export default HeroesAddForm;