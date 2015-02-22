<?php

namespace Quickstart\Bundle\AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class RegistrationFormType
 * @package Quickstart\Bundle\CsrFastStreamBundle\Form
 */
class RegistrationFormType extends AbstractType
{

    /**
     * @return string
     */
    public function getName()
    {
        return 'quickstart_user_registration';
    }

    /**
     * @return string
     */
    public function getParent()
    {
        return 'fos_user_registration';
    }

    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->remove('username')
            ->add('firstname', 'text', array('label' => 'register.form.firstname.label'))
            ->add('lastname', 'text', array('label' => 'register.form.lastname.label'))
            ->add('email', 'text', array('label' => 'register.form.email.label'))
            ->add('plainPassword', 'repeated',
                array(
                    'type'            => 'password',
                    'first_options'   => array('label' => 'register.form.password.label'),
                    'second_options'  => array('label' => 'register.form.password-confirm.label'),
                    'invalid_message' => 'fos_user.password.mismatch',
                )
            )
            ->add('registerButton', 'submit', array('label' => 'register.form.register-button.label'));
    }

    /**
     * @param OptionsResolverInterface $resolver
     */
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(
            array(
                'data_class' => 'Quickstart\Bundle\AppBundle\Entity\User',
            )
        );
    }
}
