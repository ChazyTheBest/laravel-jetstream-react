import SectionTitle from './SectionTitle';

const FormSection = ({ title, description, aside = '', form, actions, onSubmit }) =>
  <div className="md:grid md:grid-cols-3 md:gap-6">
    <SectionTitle title={title} description={description} aside={aside} />

    <div className="mt-5 md:mt-0 md:col-span-2">
      <form onSubmit={onSubmit}>
        <div className={`px-4 py-5 bg-white dark:bg-gray-800 sm:p-6 shadow ${!!actions ? 'sm:rounded-tl-md sm:rounded-tr-md' : 'sm:rounded-md'}`}>
          <div className="grid grid-cols-6 gap-6">
            {form}
          </div>
        </div>

        {!!actions && (
          <div className="flex items-center justify-end px-4 py-3 bg-gray-50 dark:bg-gray-800 text-end sm:px-6 shadow sm:rounded-bl-md sm:rounded-br-md">
            {actions}
          </div>
        )}
      </form>
    </div>
  </div>;

export default FormSection;
